whodis-cli
==========

New cli, whodis? Signup, Login, and Admin your Whodis account.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/whodis-cli.svg)](https://npmjs.org/package/whodis-cli)
[![Downloads/week](https://img.shields.io/npm/dw/whodis-cli.svg)](https://npmjs.org/package/whodis-cli)
[![License](https://img.shields.io/npm/l/whodis-cli.svg)](https://github.com/whodisio/whodis-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g whodis-cli
$ whodis COMMAND
running command...
$ whodis (-v|--version|version)
whodis-cli/0.0.0 linux-x64 node-v12.16.3
$ whodis --help [COMMAND]
USAGE
  $ whodis COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`whodis help [COMMAND]`](#whodis-help-command)
* [`whodis signup`](#whodis-signup)

## `whodis help [COMMAND]`

display help for whodis

```
USAGE
  $ whodis help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `whodis signup`

Signup and create a new Whodis account

```
USAGE
  $ whodis signup

OPTIONS
  -h, --help         show CLI help
  -p, --email=email  the email address you would like to signup with

EXAMPLE
  ➜ ./bin/run signup
  What email would you like to signup with?: hello@whodis.io
  Ok. Sending a confirmation code now... done
  What is the confirmation code that was sent to that email?: *****
  Thanks! Confirming that now... done
  You have been successfully signed up!
```

_See code: [dist/contract/commands/signup.ts](https://github.com/whodisio/whodis-cli/blob/v0.0.0/dist/contract/commands/signup.ts)_
<!-- commandsstop -->
