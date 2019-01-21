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

            const configuredTagManagerId = this.getConfiguration('id');
            let actualTagManagerId = _.get(urlToTest, "query.id");

            // check for correct analytics-id
            if (configuredTagManagerId && actualTagManagerId && actualTagManagerId !== configuredTagManagerId) {
                this.addResult(
                    "Wrong TagManager-Id",
                    `${actualTagManagerId} instead of ${configuredTagManagerId} on ${page.url()}`
                );
            }
        }
    }
}