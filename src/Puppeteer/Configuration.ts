import * as _ from "lodash";
import { URL } from "url";

interface CrawlerConfigurationInterface {
    maxDepth?: number,
    options?: object,
    resultLimit?: number
}

const defaultCrawlerConfiguration: CrawlerConfigurationInterface =
    {
        maxDepth: 0,
        options: {},
        resultLimit: 5
    };

interface TypeCheck {
    url?: string
}

const unsupportedMediaTypes = [
    'pdf', 'mp4', 'mp3', 'ogg', 'webm'
];

export function isUrlTypeUnSupported(input: TypeCheck) {
    let path = new URL(input.url).pathname;
    return unsupportedMediaTypes.some(type => path.endsWith(`.${type}`));
}

export class Configuration {
    public readonly crawlerConfiguration: CrawlerConfigurationInterface;

    constructor(private completeConfiguration) {
        let yamlCrawlerConfiguration = _.get(completeConfiguration, "crawler", {});
        this.crawlerConfiguration = _.merge({}, defaultCrawlerConfiguration, yamlCrawlerConfiguration);
    }

    has(path) {
        return _.has(this.completeConfiguration, path);
    }

    get(path, defaultValue = null) {
        return _.get(this.completeConfiguration, path, defaultValue);
    }

    applyOptions(options) {
        const overrideOptions = _.get(this.crawlerConfiguration, "options", {});
        Object.assign(options, overrideOptions);
        return options;
    }
}
