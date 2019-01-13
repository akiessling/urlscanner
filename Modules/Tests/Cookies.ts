import {AbstractTest} from "./AbstractTest";

import {Cookie} from "../Interfaces/Cookie";
import * as _ from "lodash";

export class Cookies extends AbstractTest {

    public readonly configurationPath: string = 'tests.cookies.allowed';
    public readonly resultPath: string  = 'cookies';

    async runTest(page, request) {
        // let cookies = await page.cookies();

        const allowedCookies = this.getConfiguration();

        try {
            let result = await page._client.send('Network.getAllCookies');
            let cookies: Cookie[] = result.cookies || [];
            if (cookies.length > 0)
            {
            console.log(cookies);
                cookies.forEach((cookie) => {
                    console.log(" testing " + cookie.name);
                    if (!_.includes(allowedCookies, cookie.name)) {

                        this.crawlingResults[cookie.name] = this.crawlingResults[cookie.name] || [];

                        if (!_.includes(this.crawlingResults[cookie.name], page.url())) {
                            this.crawlingResults[cookie.name].push(page.url());
                        }

                    }
                });
            }

        } catch (e) {
            console.log(e.message);
        }
    }
}