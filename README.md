# dex-runner

dexfreight dev script runner for mono repos, use it to run npm scripts individually for each workspaces

## Intallation

```sh
$ npm i -D dex-runner
```
## Usage

```sh
$ dex-runner
```

and choose options.

## considerations

**dex-runner** read `workspaces` defined in your package.json, make sure that you have defined your workspaces.

**dex-runner** read all your scripts defined in your package.json. make sure that you define the command that you want to run in `scripts` in your package.json