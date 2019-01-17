import {TestModule} from "./Modules/Interfaces/TestModule";
import * as yaml from "js-yaml";
import * as HCCrawler from "headless-chrome-crawler";
import * as fs from "fs";
import {Cookies} from "./Modules/Tests/Cookies";
import {ExternalRequests} from "./Modules/Tests/ExternalRequests";
import {GoogleAnalytics} from "./Modules/Tests/GoogleAnalytics";
import {JavaScript} from "./Modules/Tests/JavaScript";
import {OnPage} from "./Modules/Tests/OnPage";

const configuration = yaml.safeLoad(fs.readFileSync('configuration.yaml', 'utf8'));

if (!configuration.urls || configuration.urls.length === 0) {
    throw new Error("no urls configured");
}

const allTests: Array<TestModule> = [
    new ExternalRequests(configuration),
    new Cookies(configuration),
    new GoogleAnalytics(configuration),
    new JavaScript(configuration),
    new OnPage(configuration),
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
                    if (test.isEnabledForStage('request')) {
                        return test.runTest(page, request);
                    }
                    return;
                })).then(function () {
                    request.continue();
                });
            });

            page.on('console', msg => {
                Promise.all(activeTests.map(function (test) {
                    if (test.isEnabledForStage('console')) {
                        return test.runTest(page, msg);
                    }
                    return;
                })).then(function () {
                    return;
                });
            });

            page.on('load', () => {
                Promise.all(activeTests.map(function (test) {
                    if (test.isEnabledForStage('load')) {
                        return test.runTest(page, null);
                    }
                    return;
                })).then(function () {
                    return;
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