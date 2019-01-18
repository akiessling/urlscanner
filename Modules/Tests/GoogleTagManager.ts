import {AbstractTest} from "./AbstractTest";
import * as URLParse from "url-parse";
import * as _ from "lodash";

export class GoogleTagManager extends AbstractTest {
    public readonly configurationPath: string = 'tests.google_tag_manager';
    public readonly resultPath: string = 'google_tag_manager';

    runTest(page, request) {
        if (request.url().match(/https:\/\/www\.googletagmanager\.com\/gtm\.js/)) {
            const urlToTest = new URLParse(request.url(), true);
            const configuredGoogleTagManagerId = _.get(this.getConfiguration(), 'id');
            const actualGoogleTagManagerId = _.get(urlToTest, 'query.id');

            // check for correct analytics-id
            if (configuredGoogleTagManagerId && configuredGoogleTagManagerId.length > 0) {
                if (!actualGoogleTagManagerId || actualGoogleTagManagerId !== configuredGoogleTagManagerId) {
                    // this.crawlingResults["AnalyticsId"] = "Wrong Analytics-Id: " + actualAnalyticsId + " instead of " + configuredAnalyticsId;
                    this.addResult("Wrong GTM-Id", `${actualGoogleTagManagerId} instead of ${configuredGoogleTagManagerId} on ${page.url()}`)
                }
            }
        }
    }
}
