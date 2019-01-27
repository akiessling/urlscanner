import * as _ from "lodash";
import { Page } from "puppeteer";

interface CrawlerConfigurationInterface {
  maxDepth? : number,
  options? : object
}

export class Configuration {
  public crawlerConfiguration: CrawlerConfigurationInterface;
  constructor(public allConfiguration) {
    this.crawlerConfiguration = _.get(allConfiguration, "crawler", {});
  }

  applyOptions(options) {
    const overrideOptions = _.get(this.crawlerConfiguration, "options", {});
    Object.assign(options, overrideOptions);
    return options;
  }

  get maxDepth() {
    return this.crawlerConfiguration.maxDepth || 0;
  }
}
