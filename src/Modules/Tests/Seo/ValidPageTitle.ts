import { AbstractTest } from "../AbstractTest";

export class ValidPageTitle extends AbstractTest {
    public readonly configurationPath: string = 'tests.seo';
    public readonly resultPath: string = 'seo';

    async runOnPageLoad(page): Promise<any> {
        let title = await page.title();
        if (title === '') {
            this.addResult(
                'PageTitle',
                `Page Title missing on ${page.url()}`
            );
        }
    }
}