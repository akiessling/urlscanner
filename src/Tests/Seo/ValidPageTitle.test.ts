import test from "ava";
import {ValidPageTitle} from "../../Modules/Tests/Seo/ValidPageTitle";

test('Detect valid page title', async t => {
    const page = {
        url() {
            return 'https://foo.bar';
        },
        title() {
            return new Promise((resolve, reject) => {
                resolve('Hello there');
            })
        }
    };

    const test = new ValidPageTitle({});
    await test.runOnPageLoad(page);
    const result = test.getResults();

    t.deepEqual(result, {
        [test.resultPath]: {}
    })
});