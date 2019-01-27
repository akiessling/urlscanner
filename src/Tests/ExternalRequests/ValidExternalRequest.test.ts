import test from "ava";
import { AllowedExternalRequests } from "../../Modules/Tests/NetworkTraffic/AllowedExternalRequests";
import { Configuration } from "../../Puppeteer/Configuration";

test('valid external request', t => {

    let configuration = {
        tests: {
            external_requests: {
                allowed_domains: 'foo2.bar'
            }
        }
    };
    let testConfiguration = new Configuration(configuration);

    let externalRequest = new AllowedExternalRequests(testConfiguration);

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

    externalRequest.runOnRequest(page, request);

    let result = externalRequest.getResults();

    t.deepEqual(result, {[externalRequest.resultPath]: {}});
});