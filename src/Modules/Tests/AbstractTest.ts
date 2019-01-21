import {TestModule} from "../Interfaces/TestModule";
import * as _ from "lodash";

export abstract class AbstractTest implements TestModule {
    public readonly configurationPath: string = 'needs_implementation';
    public readonly resultPath: string  = 'needs_implementation';

    protected readonly crawlingResults: {};

    constructor(public configuration) {
        this.crawlingResults = {};
    }

    isEnabled(): boolean {
        return _.has(this.configuration, this.configurationPath);
    }

    getConfiguration(path?: string, defaultValue?: any) {
        let targetPath = this.configurationPath;
        if (path) {
            targetPath = this.configurationPath + '.' + path;
        }

        return _.get(this.configuration, targetPath, defaultValue);
    }

    getResults(): Object {
        return {
            [this.resultPath]: this.crawlingResults
        };
    }

    addResult(group, message) {
        this.crawlingResults[group] = this.crawlingResults[group] || [];
        this.crawlingResults[group].push(message);
    }

    async runBeforeCrawling() {}
    async runOnRequest(page, request) {}
    async runOnRequestFailed(page, request) {}
    async runOnPageLoad(page) {}
    async runOnPageError(page, error) {}
    async runAfterCrawling(page) {}

}