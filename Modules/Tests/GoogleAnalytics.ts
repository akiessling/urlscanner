import {AbstractTest} from "./AbstractTest";
import * as URLParse from "url-parse";
import * as _ from "lodash";

export class GoogleAnalytics extends AbstractTest {
    public readonly configurationPath: string = 'tests.google_analytics';
    public readonly resultPath: string = 'google_analytics';

    runTest(page, request) {
        if (request.url().match(/https:\/\/www\.google-analytics\.com\/r\/collect/)) {
            const urlToTest = new URLParse(request.url(), true);
            const configuredAnalyticsId = _.get(this.getConfiguration(), 'id');
            const actualAnalyticsId = _.get(urlToTest, 'query.tid');
            // check if is anonymized
            if (!_.has(urlToTest, 'query.aip') || parseInt(_.get(urlToTest, 'query.aip'), 10) !== 1) {
                // this.crawlingResults["Anonymize"] = ;
                this.addResult('Missing anonymize parameter', page.url())
            }
            // check for correct analytics-id
            if (configuredAnalyticsId && configuredAnalyticsId.length > 0) {
                if (!actualAnalyticsId || actualAnalyticsId !== configuredAnalyticsId) {
                    // this.crawlingResults["AnalyticsId"] = "Wrong Analytics-Id: " + actualAnalyticsId + " instead of " + configuredAnalyticsId;
                    this.addResult("Wrong Analytics-Id", `${actualAnalyticsId} instead of ${configuredAnalyticsId} on ${page.url()}`)
                }
            }
        }
    }
}