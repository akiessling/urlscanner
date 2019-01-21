import { AbstractTest } from "../AbstractTest";

export class FailedResponse extends AbstractTest{
    public readonly configurationPath: string = 'tests.failed_requests';
    public readonly resultPath: string = 'failed_requests';

    async runOnResponse(page, response): Promise<any> {
        if (response.status() >= 400) {
            this.addResult(
                'Response failed',
                `Request ${response.url()} did not respond properly: Status ${response.status()}`
            )
        }
    }
}