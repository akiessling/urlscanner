import test from "ava";
import {GoogleAnalytics} from "../../Modules/Tests/GoogleAnalytics";

test('detect missing anonymize param', t => {

    let configuration = {};
    let externalRequest = new GoogleAnalytics(configuration);

    const pageUrl = 'http://example.org/';

    const page = {
        url() {
            return pageUrl
        }
    };

    const requestUrl = 'https://www.google-analytics.com/r/collect/';
    let request = {
        url() {
            return requestUrl;
        }
    };

    externalRequest.runTest(page, request);

    let result = externalRequest.getResults();

    t.deepEqual(result, {
        [externalRequest.resultPath]: {
            ['Missing anonymize parameter']: [
                pageUrl,
            ],
        }
    });
});

test('detect wrong anonymize parameter', t => {

    let configuration = {};
    let externalRequest = new GoogleAnalytics(configuration);

    const pageUrl = 'http://example.org/';

    const page = {
        url() {
            return pageUrl
        }
    };

    const requestUrl = 'https://www.google-analytics.com/r/collect/?aip=foobar';
    let request = {
        url() {
            return requestUrl;
        }
    };

    externalRequest.runTest(page, request);

    let result = externalRequest.getResults();

    t.deepEqual(result, {
        [externalRequest.resultPath]: {
            ['Missing anonymize parameter']: [
                pageUrl,
            ],
        }
    });
});

test('detect proper anonymize parameter', t => {

    let configuration = {};
    let externalRequest = new GoogleAnalytics(configuration);

    const pageUrl = 'http://example.org/';

    const page = {
        url() {
            return pageUrl
        }
    };

    const requestUrl = 'https://www.google-analytics.com/r/collect/?aip=1';
    let request = {
        url() {
            return requestUrl;
        }
    };

    externalRequest.runTest(page, request);

    let result = externalRequest.getResults();

    t.deepEqual(result, {
        [externalRequest.resultPath]: {}
    });
});