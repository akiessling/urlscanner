import test from "ava";
import {ExternalRequests} from "../../Modules/Tests/ExternalRequests";

test('invalid external request', t => {

    let configuration = {
        'allowed_domains': 'foo3.baz'
    };
    let externalRequest = new ExternalRequests(configuration);

    const pageUrl = 'https://foo.bar';

    let page = {
        url() {
            return pageUrl
        }
    };

    const requestUrl = 'https://foo2.bar/baz.js';
    let request = {
        url() {
            return requestUrl;
        }
    };

    externalRequest.runTest(page, request);

    let result = externalRequest.getResults();

    t.deepEqual(result, {
        [externalRequest.resultPath]: {
            [requestUrl]: [
                pageUrl,
            ],
        }
    });
});