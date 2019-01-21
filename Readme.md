# Usage

## Development

Clone repo, run yarn or npm install.

Run this command, to see available options:

```
npx ts-node src/cli.ts
```

### Create new config, optionally supply target yaml file

```
npx ts-node src/cli.ts init [-c configuration.yaml]
```

### Run test, optionally with config file path and output file path

```
npx ts-node src/cli.ts run [-c configuration.yaml] [-o output.yaml]
```

## Production / Compiling

Compile the TypeScript code by invoking `tsc` in the root directory.
Now run `npm link` to globally install the urlscanner.
Now you can run anywhere

### init

```
urlscanner init [-c configuration.yaml]
```

### run

```
urlscanner run [-c configuration.yaml] [-o output.yaml]
```

## Crawling options

Top level config `crawler` allows setting request options

```
crawler:
  # see https://github.com/yujiosaka/headless-chrome-crawler/blob/master/docs/API.md#crawlerqueueoptions
  options:
    userAgent: Custom Crawler Engine
```
