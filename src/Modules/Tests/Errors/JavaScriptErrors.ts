import { AbstractTest } from "../AbstractTest";

export class JavaScriptErrors extends AbstractTest{
    public readonly configurationPath: string = 'tests.javascript_errors';
    public readonly resultPath: string = 'javascript';

    async runOnPageError(page, error): Promise<any> {
        this.addResult(
            'Errors',
            `JavaScript Error message ${error.message} on ${page.url()}`
        )
    }
}