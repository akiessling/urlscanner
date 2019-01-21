import test from "ava";
import {GoogleAnalytics} from "../../Modules/Tests/GoogleAnalytics";

test('detect wrong Google Analytics ID', t => {

    let configuration = {
        tests: {
            google_analytics: {
                id: 'UA-12345678-9'
            }
        }
    };
    let externalRequest = new GoogleAnalytics(configuration);

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

    externalRequest.runTest(page, request);

    let result = externalRequest.getResults();

    t.deepEqual(result, {
        [externalRequest.resultPath]: {
            ['Wrong Analytics-Id']: [
                'foobar instead of UA-12345678-9 on http://example.org/',
            ],
        }
    });
});
