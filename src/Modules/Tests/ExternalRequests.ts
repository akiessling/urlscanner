import {AbstractTest} from "./AbstractTest";
import * as Url from "url-parse";
import * as _ from "lodash";

export class ExternalRequests extends AbstractTest {

    public readonly configurationPath: string = 'tests.external_requests';
    public readonly resultPath: string = 'external_requests';

    runTest(page, request): void {
        let urlToTest:Url = new Url(request.url());
        let origin:Url = new Url(page.url());

        const allowedDomains = _.get(this.getConfiguration(), 'allowed_domains', []) ;
        if (urlToTest.hostname !== origin.hostname && !_.includes(allowedDomains, urlToTest.hostname)) {
            let resultObject = this.crawlingResults[request.url()] || [];
            resultObject.push(page.url());

            this.crawlingResults[request.url()] = resultObject;
        }
    }
}