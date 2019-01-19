#!/usr/bin/env ts-node

import * as yargs from "yargs";
import * as path from 'path';

// console.log(__dirname);

const CLIFILE = path.relative(process.cwd(), process.argv[1]);



let args = yargs
    .commandDir(`${__dirname}/Cli`, {
        extensions: ['js', 'ts'],
    })
    // .command('run', 'execute test run', run(yargs))
    // .option('config', {
    //     alias: 'c',
    //     description: 'config file to use',
    //     default: 'config.yaml'
    // })
    // .option('output', {
    //     alias: 'o',
    //     description: "output file with scan results",
    //     default: 'results.yaml'
    // })
    .demandCommand()
    .help('help')
    .argv;

// console.log(JSON.stringify(args));

export function run() {
    console.log("hello from ts")
}