import test from "ava";
import { AbstractTest } from "../../Modules/Tests/AbstractTest";
import { Configuration } from "../../Puppeteer/Configuration";
test('limit maximum amount of results to default value', t => {
    class Foo extends AbstractTest {
        public readonly resultPath: string = 'foo';
    }
    let testConfiguration = new Configuration({});

    let maxResults = testConfiguration.crawlerConfiguration.resultLimit;

    const upperForBound = maxResults + Math.ceil(Math.random() * 100);
    let test = new Foo(testConfiguration);
    let group = 'foo';
    for (let i = 0; i < upperForBound; i++) {
        test.addResult(group, 'bar ' + i);
    }

    t.deepEqual(test.getResults()[test.resultPath][group].length, maxResults);

});


test('override limit of results', t => {
    class Foo extends AbstractTest {
        public readonly resultPath: string = 'foo';
    }

    const resultLimit = 10;

    const testConfiguration = new Configuration({
        crawler: {
            resultLimit: resultLimit
        }
    });

    const maxResults = testConfiguration.crawlerConfiguration.resultLimit;

    const upperForBound = maxResults + Math.ceil(Math.random() * 100);
    const test = new Foo(testConfiguration);
    const group = 'foo';
    for (let i = 0; i < upperForBound; i++) {
        test.addResult(group, 'bar ' + i);
    }

    t.deepEqual(test.getResults()[test.resultPath][group].length, resultLimit);

});