import {AbstractGoogleAnalytics} from "./AbstractGoogleAnalytics";
import * as _ from "lodash";
import * as URLParse from "url-parse";

export class GoogleAnalyticsId extends AbstractGoogleAnalytics {

    async runOnRequest(page, request): Promise<any> {
        if (this.urlCondition.test(request.url())) {
            const urlToTest = new URLParse(request.url(), true);

            const validAnalyticsIds = this.getConfiguration('validIds');
            let actualAnalyticsId = _.get(urlToTest, "query.tid");

            // check for correct analytics-id
            if (validAnalyticsIds.length > 0 && actualAnalyticsId && validAnalyticsIds.includes(actualAnalyticsId) === false) {
                this.addResult(
                    "Wrong Analytics-Id",
                    `${actualAnalyticsId} on ${page.url()}`
                );
            }
        }
    }
}