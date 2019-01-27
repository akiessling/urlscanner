import { Argv } from "yargs";
import { TestModule } from "../Modules/Interfaces/TestModule";
import { AllowedExternalRequests } from "../Modules/Tests/NetworkTraffic/AllowedExternalRequests";
import { AllowedCookies } from "../Modules/Tests/Cookies/AllowedCookies";
import * as HCCrawler from "headless-chrome-crawler";

import * as yaml from "js-yaml";
import * as fs from "fs";
import { Page } from "puppeteer";
import { Configuration, isUrlTypeUnSupported } from "../Puppeteer/Configuration";
import { GoogleAnalyticsAnonymizeIp } from "../Modules/Tests/GoogleAnalytics/GoogleAnalyticsAnonymizeIp";
import { GoogleAnalyticsId } from "../Modules/Tests/GoogleAnalytics/GoogleAnalyticsId";
import { JavaScriptErrors } from "../Modules/Tests/Errors/JavaScriptErrors";
import { FailedRequest } from "../Modules/Tests/Errors/FailedRequest";
import { FailedResponse } from "../Modules/Tests/Errors/FailedResponse";
import { GoogleTagManagerId } from "../Modules/Tests/GoogleTagManager/GoogleTagManagerId";
import { ValidPageTitle } from "../Modules/Tests/Seo/ValidPageTitle";
import { ExitCode } from "../Modules/Scanner/ExitCode";
import ora = require("ora");

export const command: string = "run [-c configuration.yaml] [-o results.yaml]";
export const desc: string = "Run test with given config file";

export const builder = (yargs: Argv) =>
    yargs
        .usage("Usage: $0 run [Options]")
        .option("config", {
            alias: "c",
            description: "config file to use",
            default: "configuration.yaml"
        })
        .option("output", {
            alias: "o",
            description: "output file with scan results",
            default: "results.yaml"
        });

function getConfiguration(argv) {
    if (!fs.existsSync(argv.config)) {
        throw new TypeError(
            `Config file ${argv.config} does not exist, run init to generate one`
        );
    }

    const configuration = yaml.safeLoad(fs.readFileSync(argv.config, "utf8"));

    if (!configuration.urls || configuration.urls.length === 0) {
        throw new Error("no urls configured");
    }

    return configuration;
}

export function handler(argv) {
    let totalCrawled = 0;

    const loadedConfiguration = getConfiguration(argv);
    const configuration = new Configuration(loadedConfiguration);

    const allTests: TestModule[] = [
        new AllowedExternalRequests(configuration),
        new AllowedCookies(configuration),
        new GoogleAnalyticsAnonymizeIp(configuration),
        new GoogleAnalyticsId(configuration),
        new GoogleTagManagerId(configuration),
        new JavaScriptErrors(configuration),
        new FailedRequest(configuration),
        new FailedResponse(configuration),
        new ValidPageTitle(configuration)
    ];

    const activeTests = allTests.filter(test => {
        return test.isEnabled();
    });

    const spinner = ora("Loading pages").start();

    (async () => {
        const crawler = await HCCrawler.launch({

            preRequest(options) {
                // e.g. if pdf is inserted as iframe
                if (isUrlTypeUnSupported({url: options.url})) {
                    return false;
                }

                for (let test of activeTests) {
                    options = test.runBeforeCrawling(options);
                    if (!options) {
                        return false;
                    }
                }

                return options;
            },
            customCrawl: async (page: Page, crawl) => {
                // You can access the page object before requests
                await page.setRequestInterception(true);

                page.on("request", request => {
                    // check at first to detect pdf files
                    if (isUrlTypeUnSupported({url: request.url()})) {
                        request.abort();
                    } else if (request.isNavigationRequest()) {
                        request.continue();
                    } else {
                        Promise.all(
                            activeTests.map(test => {
                                test.runOnRequest(page, request);
                            })
                        ).then(function () {
                            request.continue();
                        }).catch(reason => console.log(reason));
                    }
                });

                page.on("requestfailed", request => {
                    Promise.all(
                        activeTests.map(test => {
                            test.runOnRequestFailed(page, request);
                        })
                    ).catch(reason => console.log(reason));
                });

                page.on("response", response => {
                    Promise.all(
                        activeTests.map(test => {
                            test.runOnResponse(page, response);
                        })
                    ).catch(reason => console.log(reason));
                });

                page.on("pageerror", error => {
                    Promise.all(
                        activeTests.map(test => {
                            test.runOnPageError(page, error);
                        })
                    ).catch(reason => console.log(reason));
                });

                page.on("load", () => {
                    Promise.all(
                        activeTests.map(test => {
                            test.runOnPageLoad(page);
                        })
                    ).catch(reason => console.log(reason));
                });

                // // The result contains options, links, cookies and etc.
                const result = await crawl();
                // // You can access the page object after requests
                // result.content = await page.content();
                // // You need to extend and return the crawled result
                return result;
            },

            onSuccess: result => {
                totalCrawled++;
                spinner.text = `Total crawled: ${totalCrawled}`;
            },

            onError: error => {
                console.log(error);
            },

            maxDepth: configuration.get('crawler.maxDepth')
        });

        await crawler.queue(loadedConfiguration.urls);

        await crawler.onIdle(); // Resolved when no queue is left
        await crawler.close(); // Close the crawler

        spinner.succeed(
            `Crawling done, saving results for ${totalCrawled} pages to ${
                argv.output
                }`
        );

        let crawlingResults = {
            results: activeTests.map(test => test.getResults())
        };

        let yamlOut = yaml.safeDump(crawlingResults);
        fs.writeFileSync(argv.output, yamlOut);

        let totalErrors = activeTests.reduce((sum, test) => sum + test.errorCount, 0);

        if (totalErrors > 0) {
            console.log(`Total errors: ${totalErrors}`);
            process.exit(ExitCode.TestsWithErrors);
        } else {
            console.log(`No errors found`);
            process.exit(ExitCode.Ok);
        }

    })();
}
