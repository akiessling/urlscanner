import test from "ava";
import {ValidPageTitle} from "../../Modules/Tests/Seo/ValidPageTitle";
import { Configuration } from "../../Puppeteer/Configuration";

test('Detect empty page title', async t => {
    const page = {
        url() {
            return 'https://foo.bar';
        },
        title() {
            return new Promise((resolve, reject) => {
                resolve('');
            })
        }
    };

    const test = new ValidPageTitle(new Configuration({}));
    await test.runOnPageLoad(page);
    const result = test.getResults();

    t.deepEqual(result, {
        [test.resultPath]: {
            PageTitle: [
                'Page Title missing on https://foo.bar',
            ],
        }
    })
});