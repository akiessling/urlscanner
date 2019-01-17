import test from "ava";
import {ExternalRequests} from "../../Modules/Tests/ExternalRequests";

test('foo', t => {

    let configuration = {};
    let externalRequest = new ExternalRequests(configuration);

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

    externalRequest.runTest(page, request);

    let result = externalRequest.getResults();

    t.deepEqual(result, {
        [externalRequest.resultPath]: {}
    });
});