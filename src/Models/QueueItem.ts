import {Cookie} from "puppeteer";

export interface WaitFor {
    selectorOrFunctionOrTimeout: string|number|any;
    options: object;
    args: Array<any>;
}

export interface QueueItem {
    url?: string;
    maxDepth?: number;
    priority?: number;
    depthPriority?: number;
    skipDuplicates?: boolean;
    skipRequestedRedirect?: boolean;
    obeyRobotsTxt?: boolean;
    followSitemapXml?: boolean;
    allowedDomains?: Array<string|RegExp>;
    deniedDomains?: Array<string|RegExp>;
    delay?: number;
    timeout?: number;
    waitUntil?: string|Array<string>;
    waitFor?: WaitFor;
    retryCount?: number;
    retryDelay?: number;
    jQuery?: boolean;
    browserCache?: boolean;
    device?: string;
    username?: string;
    screenshot?: any;
    viewport?: {
        width?: number,
        height?: number
    }
    password?: string;
    userAgent?: string;
    extraHeaders?: object;
    cookies?: Cookie[];
    evaluatePage?: any;
}