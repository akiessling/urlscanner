import {AbstractTest} from "./AbstractTest";
import * as Url from "url-parse";
import * as _ from "lodash";

export class ExternalRequests extends AbstractTest {

    public readonly configurationPath: string = 'tests.external_requests.allowed_domains';
    public readonly resultPath: string  = 'external_requests';

    runTest(page, request): void {
        let urlToTest = new Url(request.url());
        let originDomain = new Url(page.url()).domain;

        if (urlToTest.domain !== originDomain && !_.includes(this.getConfiguration(), urlToTest.hostname)) {
            let resultObject = this.crawlingResults[request.url()] || [];
            resultObject.push(page.url());

            this.crawlingResults[request.url()] = resultObject;
        }
    }
}