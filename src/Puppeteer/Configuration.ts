import * as _ from "lodash";
import {QueueItemGenerator} from "../Factories/QueueItemGenerator";

interface ConfigurationInterface {
    maxDepth?: number,
    options?: object
}

export class Configuration {
    public configuration: ConfigurationInterface;
    private queueItemFactory: QueueItemGenerator;

    constructor(public allConfiguration) {
        this.configuration = _.get(allConfiguration, "crawler", {});
        this.queueItemFactory = new QueueItemGenerator(this.allConfiguration);
    }

    public getQueue() {
        return this.queueItemFactory.getItems();
    }

    get maxDepth() {
        return this.configuration.maxDepth || 0;
    }
}
