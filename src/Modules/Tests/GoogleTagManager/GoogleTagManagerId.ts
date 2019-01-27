import {AbstractTest} from "../AbstractTest";
import * as _ from "lodash";
import * as URLParse from "url-parse";

export class GoogleTagManagerId extends AbstractTest {

    public readonly configurationPath: string = "tests.google_tagmanager";
    public readonly resultPath: string = "google_tagmanager";

    protected urlCondition = /https:\/\/www\.googletagmanager\.com\/gtm\.js/;

    async runOnRequest(page, request): Promise<any> {
        if (this.urlCondition.test(request.url())) {
            const urlToTest = new URLParse(request.url(), true);

            const validTagManagerIds = this.getModuleConfiguration('validIds');
            let actualTagManagerId = _.get(urlToTest, "query.id");

            // check for correct analytics-id
            if (validTagManagerIds.length > 0 && actualTagManagerId &&  validTagManagerIds.includes(actualTagManagerId) === false) {
                this.addResult(
                    "Wrong TagManager-Id",
                    `${actualTagManagerId} on ${page.url()}`
                );
            }
        }
    }
}