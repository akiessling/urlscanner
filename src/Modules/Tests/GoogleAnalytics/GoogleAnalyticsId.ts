import {AbstractGoogleAnalytics} from "./AbstractGoogleAnalytics";
import * as _ from "lodash";
import * as URLParse from "url-parse";

export class GoogleAnalyticsId extends AbstractGoogleAnalytics {

    async runTest(page, request) {
        if (this.urlCondition.test(request.url())) {
            const urlToTest = new URLParse(request.url(), true);

            const configuredAnalyticsId = this.getConfiguration('id');
            let actualAnalyticsId = _.get(urlToTest, "query.tid");

            // check for correct analytics-id
            if (configuredAnalyticsId && actualAnalyticsId && actualAnalyticsId !== configuredAnalyticsId) {
                this.addResult(
                    "Wrong Analytics-Id",
                    `${actualAnalyticsId} instead of ${configuredAnalyticsId} on ${page.url()}`
                );
            }
        }
    }
}