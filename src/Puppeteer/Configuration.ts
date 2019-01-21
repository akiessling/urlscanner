import * as _ from "lodash";
import { Page } from "puppeteer";

interface ConfigurationInterface {
  maxDepth? : number,
  options? : object
}

export class Configuration {
  public configuration: ConfigurationInterface;
  constructor(public allConfiguration) {
    this.configuration = _.get(allConfiguration, "crawler", {});
  }

  applyOptions(options) {
    const overrideOptions = _.get(this.configuration, "options", {});
    Object.assign(options, overrideOptions);
    return options;
  }

  get maxDepth() {
    return this.configuration.maxDepth || 0;
  }
}
