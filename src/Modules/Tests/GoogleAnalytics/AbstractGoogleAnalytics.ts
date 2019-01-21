import {AbstractTest} from "../AbstractTest";
import * as URLParse from "url-parse";
import * as _ from "lodash";

export abstract class AbstractGoogleAnalytics extends AbstractTest {
    public readonly configurationPath: string = "tests.google_analytics";
    public readonly resultPath: string = "google_analytics";

    protected urlCondition = /https:\/\/www\.google-analytics\.com(\/r)?\/collect/;
}