export interface TestModule {
    configurationPath: string;

    errorCount:number;

    isEnabled(): boolean;
    getConfiguration(): {};
    getResults(): Object;
    runBeforeCrawling(options): void;
    runOnRequest(page, request): void;
    runOnRequestFailed(page, request): void;
    runOnResponse(page, response): void;
    runOnPageLoad(page): void;
    runOnPageError(page, error): void;
    runAfterCrawling(): void;

}
