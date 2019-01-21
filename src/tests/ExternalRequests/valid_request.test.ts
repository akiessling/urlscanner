import test from "ava";
import { AllowedExternalRequests } from "../../Modules/Tests/NetworkTraffic/AllowedExternalRequests";

test('valid request', t => {

    let configuration = {};
    let externalRequest = new AllowedExternalRequests(configuration);

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