#!/usr/bin/env node

import * as yargs from "yargs";

let args = yargs
    .commandDir(`${__dirname}/Cli`, {
        extensions: ['ts', 'js'],
    })
    .demandCommand()
    .help('help')
    .argv;
