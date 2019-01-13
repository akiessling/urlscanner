import {TestModuleInterface} from "../Interfaces/TestModuleInterface";
import * as _ from "lodash";

export abstract class AbstractTest implements TestModuleInterface {

    public readonly configurationPath: string = 'needs_implementation';
    public readonly resultPath: string  = 'needs_implementation';

    protected readonly crawlingResults: {};

    constructor(public configuration) {
        this.crawlingResults = {};
    }

    isEnabled(): boolean {
        //console.log(this.configurationPath);
        //console.log(this.configuration);
        return _.has(this.configuration, this.configurationPath);
    }

    getConfiguration() {
        return _.get(this.configuration, this.configurationPath);
    }

    getResults(): Object {
        return {
            [this.resultPath]: this.crawlingResults
        };
    }

    async abstract runTest(page, request);

}