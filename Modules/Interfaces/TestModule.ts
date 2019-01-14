export interface TestModule {
    isEnabled(): boolean;
    getConfiguration(): Array<object>;
    runTest(page, request): void;
    getResults(): Object;
}
