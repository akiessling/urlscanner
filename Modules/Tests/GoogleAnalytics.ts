import {AbstractTest} from "./AbstractTest";
import * as URLParse from "url-parse";
import * as _ from "lodash";

export class GoogleAnalytics extends AbstractTest{
    public readonly configurationPath: string = 'tests.google_analytics';
    public readonly resultPath: string = 'google_analytics';

    runTest(page, request) {
        if (request.url().match(/https:\/\/www\.google-analytics\.com\/r\/collect/)) {
            const urlToTest = new URLParse(request.url(), true);
            const analyticsId = this.getConfiguration().id;
            // check if is anonymized
            if (!_.has(urlToTest, 'query.aip') || parseInt(_.get(urlToTest, 'query.aip'), 10) !== 1) {
                this.crawlingResults["Anonymize"] = "Missing anonymize parameter";
            }
            // check for correct analytics-id
            if (analyticsId.length > 0 && (!_.has(urlToTest, 'query.tid') || _.get(urlToTest, 'query.tid') !== analyticsId)) {
                this.crawlingResults["AnalyticsId"] = "Wrong Analytics-Id: " + _.get(urlToTest, 'query.tid') + " instead of " + analyticsId;
            }
        }
    }
}