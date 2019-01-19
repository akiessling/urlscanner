import * as _ from "lodash";
import { Page } from "puppeteer";

export class Configuration {
  public configuration: object;
  constructor(public allConfiguration) {
    this.configuration = _.get(allConfiguration, "crawler", {});
  }

  applyOptions(options) {
    const overrideOptions = _.get(this.configuration, "options", {});
    Object.assign(options, overrideOptions);
    return options;
  }
}
