import test from "ava";
import {GoogleAnalyticsId} from "../../Modules/Tests/GoogleAnalytics/GoogleAnalyticsId";

test('detect wrong Google Analytics ID', t => {

    let configuration = {
        tests: {
            google_analytics: {
                id: 'UA-12345678-9'
            }
        }
    };
    let tester = new GoogleAnalyticsId(configuration);

    const pageUrl = 'http://example.org/';

    const page = {
        url() {
            return pageUrl
        }
    };

    const requestUrl = 'https://www.google-analytics.com/r/collect/?aip=1&tid=foobar';
    let request = {
        url() {
            return requestUrl;
        }
    };

    tester.runTest(page, request);

    let result = tester.getResults();

    t.deepEqual(result, {
        [tester.resultPath]: {
            ['Wrong Analytics-Id']: [
                'foobar instead of UA-12345678-9 on http://example.org/',
            ],
        }
    });
});

test('detect proper Google Analytics ID', t => {

    let configuration = {
        tests: {
            google_analytics: {
                id: 'UA-12345678-9'
            }
        }
    };
    let tester = new GoogleAnalyticsId(configuration);

    const pageUrl = 'http://example.org/';

    const page = {
        url() {
            return pageUrl
        }
    };

    const requestUrl = `https://www.google-analytics.com/r/collect/?aip=1&tid=${configuration.tests.google_analytics.id}`;
    let request = {
        url() {
            return requestUrl;
        }
    };

    tester.runTest(page, request);

    let result = tester.getResults();

    t.deepEqual(result, {
        [tester.resultPath]: {}
    });
});
