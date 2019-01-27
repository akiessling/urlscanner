import test from "ava";
import { AllowedExternalRequests } from "../../Modules/Tests/NetworkTraffic/AllowedExternalRequests";
import { Configuration } from "../../Puppeteer/Configuration";

test('valid request', t => {
    let testConfiguration = new Configuration({});
    let externalRequest = new AllowedExternalRequests(testConfiguration);

    let page = {
        url() {
            return 'https://foo.bar'
        }
    };

    let request = {
        url() {
            return 'https://foo.bar/baz.js'
        }
    };

    externalRequest.runOnRequest(page, request);

    let result = externalRequest.getResults();

    t.deepEqual(result, {
        [externalRequest.resultPath]: {}
    });
});