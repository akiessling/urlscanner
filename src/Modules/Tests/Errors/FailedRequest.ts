import { AbstractTest } from "../AbstractTest";

export class FailedRequest extends AbstractTest{
    public readonly configurationPath: string = 'tests.failed_requests';
    public readonly resultPath: string = 'failed_requests';

    async runOnRequestFailed(page, request): Promise<any> {
        this.addResult(
            'Request failed',
            `Request ${request.url()} failed with message ${request.failure().errorText} on ${page.url()}. Redirect-Chain: ${request.redirectChain().join(' - ')}`
        )
    }
}