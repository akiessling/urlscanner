#!/usr/bin/env node

import * as yargs from "yargs";

let args = yargs
    .commandDir(`${__dirname}/Cli`, {
        extensions: process.env.NODE_ENV === 'development' ? ['ts'] : ['js'],
    })
    .demandCommand()
    .help('help')
    .argv;
