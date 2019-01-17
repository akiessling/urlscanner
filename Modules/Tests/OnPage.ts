import {AbstractTest} from "./AbstractTest";

export class OnPage extends AbstractTest{
    public readonly configurationPath: string = 'tests.onpage';
    public readonly resultPath: string = 'onpage';

    runTest(page, msg) {
        if (page.title() === '') {
            this.crawlingResults['title'] = 'No title found on page ' + page.url();
        }
    }

    isEnabledForStage(stage) {
        return stage === 'load';
    }

}