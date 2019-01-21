import {AbstractTest} from "../AbstractTest";
const VerEx = require('verbal-expressions');
import * as URLParse from "url-parse";
import * as _ from "lodash";

export abstract class AbstractGoogleAnalytics extends AbstractTest{
    public readonly configurationPath: string = "tests.google_analytics";
    public readonly resultPath: string = "google_analytics";

    protected urlCondition = new VerEx()
        .startOfLine()
        .then("http")
        .maybe("s")
        .then("://www.google-analytics.com/")
        .maybe("r/")
        .then("collect/")
        .anything()
        .endOfLine();
}