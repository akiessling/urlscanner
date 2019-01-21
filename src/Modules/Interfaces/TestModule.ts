export interface TestModule {
    configurationPath: string;

    isEnabled(): boolean;
    getConfiguration(): {};
    getResults(): Object;
    runBeforeCrawling(): void;
    runOnRequest(page, request): void;
    runOnRequestFailed(page, request): void;
    runOnResponse(page, response): void;
    runOnPageLoad(page): void;
    runOnPageError(page, error): void;
    runAfterCrawling(page): void;

}
