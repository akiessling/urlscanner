export interface TestModule {
    configurationPath: string;

    isEnabled(): boolean;
    getConfiguration(): {};
    runTest(page, request): void;
    getResults(): Object;
}
