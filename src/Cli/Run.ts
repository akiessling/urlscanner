import {Arguments, Argv, Options} from 'yargs';

export const command: string = 'run <command>';
// export const aliases: string[] = ['r'];
export const desc: string = 'Create or generate new serverless resources';

export const builder = (yargs: Argv) =>
    yargs.usage('Usage: $0 run [Options]')
        .option(
            'config', {
                alias: 'c',
                description: 'config file to use',
                default: 'configuration.yaml'
            })
        .option('output', {
            alias: 'o',
            description: "output file with scan results",
            default: 'results.yaml'
        });