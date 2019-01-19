import * as fs from "fs";
import * as process from "process";
import * as path from "path";
import { Argv } from "yargs";

export const command = "init";
export const desc = "Copy example configuration file to current directory";
export const builder = (yargs: Argv) =>
  yargs.usage("Usage: $0 run [Options]").option("config", {
    alias: "c",
    description: "config file to generate",
    default: "configuration.yaml"
  });

export function handler(argv) {
  if (fs.existsSync(path.resolve(process.cwd(), argv.config))) {
    console.log(argv.config, "exists, skipping");
  } else {
    fs.copyFileSync(
      path.resolve(__dirname, "../../configuration.yaml.dist"),
      argv.config
    );
  }
}
