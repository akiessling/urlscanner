import {AbstractTest} from "../AbstractTest";

import {Cookie} from "../../Interfaces/Cookie";
import * as _ from "lodash";

export class AllowedCookies extends AbstractTest {

    public readonly configurationPath: string = 'tests.cookies';
    public readonly resultPath: string  = 'cookies';

    async runOnRequest(page, request): Promise<any> {
        const allowedCookies = this.getModuleConfiguration().allowed;

        try {
            let result = await page._client.send('Network.getAllCookies');
            let cookies: Cookie[] = result.cookies || [];
            if (cookies.length > 0)
            {
                cookies.forEach((cookie) => {
                    if (!_.includes(allowedCookies, cookie.name)) {

                        this.addResult(cookie.name, page.url());
                    }
                });
            }

        } catch (e) {
            console.log(e.message);
        }
    }
}