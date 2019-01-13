export interface TestModuleInterface {
    isEnabled(): boolean;
    getConfiguration(): Array<object>;
    runTest(page, request): void;
    getResults(): Object;
}
