import * as _ from "lodash";
import {URL} from "url";

interface ConfigurationInterface {
  maxDepth? : number,
  options? : object
}

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
