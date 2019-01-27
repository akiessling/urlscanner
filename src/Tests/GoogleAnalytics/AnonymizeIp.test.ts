import test from "ava";
import {GoogleAnalyticsAnonymizeIp} from "../../Modules/Tests/GoogleAnalytics/GoogleAnalyticsAnonymizeIp";
import { Configuration } from "../../Puppeteer/Configuration";

test('detect missing anonymize param', t => {

    let configuration = {};
    let testConfiguration = new Configuration(configuration);
    let externalRequest = new GoogleAnalyticsAnonymizeIp(testConfiguration);

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

    externalRequest.runOnRequest(page, request);

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
    let testConfiguration = new Configuration(configuration);
    let externalRequest = new GoogleAnalyticsAnonymizeIp(testConfiguration);

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

    externalRequest.runOnRequest(page, request);

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
    let testConfiguration = new Configuration(configuration);
    let externalRequest = new GoogleAnalyticsAnonymizeIp(testConfiguration);

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

    externalRequest.runOnRequest(page, request);

    let result = externalRequest.getResults();

    t.deepEqual(result, {
        [externalRequest.resultPath]: {}
    });
});