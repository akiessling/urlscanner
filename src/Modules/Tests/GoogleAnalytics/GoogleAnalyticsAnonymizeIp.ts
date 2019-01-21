import {AbstractGoogleAnalytics} from "./AbstractGoogleAnalytics";
import * as _ from "lodash";
import * as URLParse from "url-parse";


export class GoogleAnalyticsAnonymizeIp extends AbstractGoogleAnalytics {





    async runTest(page, request): Promise<any> {
        if (this.urlCondition.test(request.url())) {
            const urlToTest = new URLParse(request.url(), true);

            let aipValue = parseInt(_.get(urlToTest, "query.aip", 0), 10);

            // check if is anonymized
            if (aipValue !== 1) {
                this.addResult("Missing anonymize parameter", page.url());
            }
        }
    }


}