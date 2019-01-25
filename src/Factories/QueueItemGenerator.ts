import * as _ from "lodash";
import {URL} from "url";
import {QueueItem} from "../Models/QueueItem";

export class QueueItemGenerator {
    private readonly urls: string | string[];
    private defaults: QueueItem;
    private extractedAllowedDomains: Array<string>;
    constructor(public configuration) {
        this.urls = configuration.urls;
        this.defaults = _.get(configuration, 'crawler.options', {});
        // this key must not be present in the defaults object
        delete this.defaults.url;
    }

    public getItems() {
        return this.prepareItems(this.urls);
    }

    public prepareItems(queueInput: string|object|Array<string|object>) {
        if (_.isString(queueInput)) {
            return this.createQueueItemFromString(queueInput);
        }

        if (!_.isArray(queueInput)) {
            return this.createQueueItemFromObject(queueInput);
        }

        // deal with an array of urls / objects
        if (_.isArray(queueInput)) {
            return queueInput.map(entry => this.prepareItems(entry));
        }

        return [];
    }

    public createQueueItemFromString(input: string) {
        return this.createQueueItemFromObject({url: input});
    }

    public createQueueItemFromObject(input: QueueItem) {
        let allowedDomains = _.get(input, 'allowedDomains', []);
        allowedDomains.push(new URL(input.url).hostname);
        return _.merge({}, this.defaults, input, {allowedDomains: allowedDomains});
    }
}