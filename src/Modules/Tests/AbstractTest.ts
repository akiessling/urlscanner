import { TestModule } from "../Interfaces/TestModule";
import { Configuration } from "../../Puppeteer/Configuration";

export abstract class AbstractTest implements TestModule {
    public readonly configurationPath: string = 'needs_implementation';
    public readonly resultPath: string = 'needs_implementation';
    public errorCount: number = 0;

    private readonly crawlingResults: {};

    constructor(private configuration: Configuration) {
        this.crawlingResults = {};
    }

    isEnabled(): boolean {
        return this.configuration.has(this.configurationPath);
    }

    getModuleConfiguration(path?: string, defaultValue?: any) {
        let targetPath = this.configurationPath;
        if (path) {
            targetPath = this.configurationPath + '.' + path;
        }

        return this.configuration.get(targetPath, defaultValue);
    }

    getResults(): Object {
        return {
            [this.resultPath]: this.crawlingResults
        };
    }

    addResult(group, message, markAsError = true) {
        this.crawlingResults[group] = this.crawlingResults[group] || [];
        if (!this.crawlingResults[group].includes(message)) {
            if (markAsError) {
                this.errorCount++;
            }

            this.crawlingResults[group].push(message);
        }
    }

    async runBeforeCrawling() {
    }

    async runOnRequest(page, request) {
    }

    async runOnRequestFailed(page, request) {
    }

    async runOnResponse(page, response) {
    }

    async runOnPageLoad(page) {
    }

    async runOnPageError(page, error) {
    }

    async runAfterCrawling(page) {
    }

}