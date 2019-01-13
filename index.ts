import {TestModuleInterface} from "./Modules/Interfaces/TestModuleInterface";
import * as yaml from "js-yaml";
import * as HCCrawler from "headless-chrome-crawler";
import * as fs from "fs";
import {Cookies} from "./Modules/Tests/Cookies";
import {ExternalRequests} from "./Modules/Tests/ExternalRequests";

const configuration = yaml.safeLoad(fs.readFileSync('configuration.yaml', 'utf8'));

if (!configuration.urls || configuration.urls.length === 0) {
    throw new Error("no urls configured");
}

const allTests: Array<TestModuleInterface> = [
    new ExternalRequests(configuration),
    new Cookies(configuration)
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
                activeTests.forEach((test) => test.runTest(page, request));
                request.continue();
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