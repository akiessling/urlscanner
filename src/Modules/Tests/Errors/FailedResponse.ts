import { AbstractTest } from "../AbstractTest";

export class FailedResponse extends AbstractTest{
    public readonly configurationPath: string = 'tests.failed_response';
    public readonly resultPath: string = 'failed_response';

    async runOnResponse(page, response): Promise<any> {
        if (response.status() >= 400) {
            this.addResult(
                response.url(),
                `Status ${response.status()} - used on ${page.url()}`
            )
        }
    }
}