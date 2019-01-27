import test from "ava";
import {GoogleAnalyticsId} from "../../Modules/Tests/GoogleAnalytics/GoogleAnalyticsId";
import { Configuration } from "../../Puppeteer/Configuration";

test('detect wrong Google Analytics ID', t => {

    let configuration = {
        tests: {
            google_analytics: {
                validIds: ['UA-12345678-9']
            }
        }
    };
    let testConfiguration = new Configuration(configuration);
    let tester = new GoogleAnalyticsId(testConfiguration);

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

    tester.runOnRequest(page, request);

    let result = tester.getResults();

    t.deepEqual(result, {
        [tester.resultPath]: {
            ['Wrong Analytics-Id']: [
                'foobar on http://example.org/',
            ],
        }
    });
});

test('detect proper Google Analytics ID', t => {

    let configuration = {
        tests: {
            google_analytics: {
                validIds: ['UA-12345678-9']
            }
        }
    };
    let testConfiguration = new Configuration(configuration);
    let tester = new GoogleAnalyticsId(testConfiguration);

    const pageUrl = 'http://example.org/';

    const page = {
        url() {
            return pageUrl
        }
    };

    const requestUrl = `https://www.google-analytics.com/r/collect/?aip=1&tid=${configuration.tests.google_analytics.validIds[0]}`;
    let request = {
        url() {
            return requestUrl;
        }
    };

    tester.runOnRequest(page, request);

    let result = tester.getResults();

    t.deepEqual(result, {
        [tester.resultPath]: {}
    });
});
