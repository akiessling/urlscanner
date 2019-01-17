import {AbstractTest} from "./AbstractTest";
import * as URLParse from "url-parse";
import * as _ from "lodash";

export class GoogleAnalytics extends AbstractTest{
    public readonly configurationPath: string = 'tests.google_analytics';
    public readonly resultPath: string = 'google_analytics';

    runTest(page, request) {
        if (request.url().match(/https:\/\/www\.google-analytics\.com(\/r)?\/collect/)) {
            const urlToTest = new URLParse(request.url(), true);
            if (!_.has(urlToTest, 'query.aip') || parseInt(_.get(urlToTest, 'query.aip'), 10) !== 1) {
                this.crawlingResults["Anonimize"] = "Missing anonymize parameter";
            }
        }
    }

    isEnabledForStage(stage) {
        return stage === 'request';
    }

}