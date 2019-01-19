import {Argv} from 'yargs';
import {TestModule} from "../Modules/Interfaces/TestModule";
import {ExternalRequests} from "../Modules/Tests/ExternalRequests";
import {Cookies} from "../Modules/Tests/Cookies";
import {GoogleAnalytics} from "../Modules/Tests/GoogleAnalytics";
import * as HCCrawler from "headless-chrome-crawler";
import * as yaml from "js-yaml";
import * as fs from "fs";

export const command: string = 'run';
export const desc: string = 'Create or generate new serverless resources';

export const builder = (yargs: Argv) =>
    yargs.usage('Usage: $0 run [Options]')
        .option(
            'config', {
                alias: 'c',
                description: 'config file to use',
                default: 'configuration.yaml'
            })
        .option('output', {
            alias: 'o',
            description: "output file with scan results",
            default: 'results.yaml'
        });



export function handler (argv) {

    if (!fs.existsSync(argv.config)) {
        throw new TypeError(`Config file ${argv.config} does not exist`);
    }

    const configuration = yaml.safeLoad(fs.readFileSync(argv.config, 'utf8'));

    if (!configuration.urls || configuration.urls.length === 0) {
        throw new Error("no urls configured");
    }


    const allTests: Array<TestModule> = [
        new ExternalRequests(configuration),
        new Cookies(configuration),
        new GoogleAnalytics(configuration),
    ];

    const activeTests = allTests.filter((test) => {
        return test.isEnabled();
    });

// console.log(activeTests);

    (async () => {
        const crawler = await HCCrawler.launch({

            customCrawl: async (page, crawl) => {
                // You can access the page object before requests
                await page.setRequestInterception(true);
                page.on('request', request => {
                    Promise.all(activeTests.map(function (test) {
                        return test.runTest(page, request);
                    })).then(function () {
                        request.continue();
                    });
                });

                // // The result contains options, links, cookies and etc.
                const result = await crawl();
                // // You can access the page object after requests
                // result.content = await page.content();
                // // You need to extend and return the crawled result
                return result;
            },

            maxDepth: 0,
        });

        await crawler.queue(configuration.urls);

        await crawler.onIdle(); // Resolved when no queue is left
        await crawler.close(); // Close the crawler

        let crawlingResults = {results: activeTests.map((test) => test.getResults())};
        // console.log(crawlingResults);

        let yamlOut = yaml.safeDump(crawlingResults);
        fs.writeFileSync('out.yaml', yamlOut);

    })();
}


