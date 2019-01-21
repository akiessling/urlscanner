import { AbstractTest } from "../AbstractTest";

export class FailedRequest extends AbstractTest{
    public readonly configurationPath: string = 'tests.failed_requests';
    public readonly resultPath: string = 'failed_requests';

    async runOnRequestFailed(page, request): Promise<any> {
        const whiteListedErrorMessages = [
            'net::ERR_ABORTED', // this is a user abort, e.g. pdf, mp4 etc in headless mode
            'net::ERR_CONNECTION_RESET' // this is too generic an error with too many false positives
        ];
        if (whiteListedErrorMessages.includes(request.failure().errorText) === false) {
            this.addResult(
                'Request failed',
                `Request ${request.url()} failed with message ${request.failure().errorText} on ${page.url()}. Redirect-Chain: ${request.redirectChain().join(' - ')}`
            );
        }
    }
}