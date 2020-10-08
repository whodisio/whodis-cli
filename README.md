# whodis-cli

New phone, whodis? Signup, Login, and Admin your Whodis account.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/whodis-cli.svg)](https://npmjs.org/package/whodis-cli)
[![Downloads/week](https://img.shields.io/npm/dw/whodis-cli.svg)](https://npmjs.org/package/whodis-cli)
[![License](https://img.shields.io/npm/l/whodis-cli.svg)](https://github.com/whodisio/whodis-cli/blob/master/package.json)

# Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Commands](#commands)

# Getting Started

### install

```
npm install -g whodis-cli
```

### signup

```
whodis signup --email=__YOUR_EMAIL__
```

### reserve a namespace for your application / organization / business

You can create multiple user directories in a namespace. This namespace is the name that confirmation code emails / texts will include, to identify to the user who this confirmation code is from.

```
whodis namespace:reserve --namespace=__YOUR_APPS_NAME__
```

After reserving a namespace, you are the only one who can create directories with that namespace.

### create a directory under your namespace

Inside of your namespace, you can have one or more user directories.

```
whodis directory:create --namespace=__YOUR_APPS_NAME__ --name=consumers
```

Some applications use different user directories for different types of users (e.g., customers -vs- delivery drivers). Others only have one type of user.

A user must sign up to each user directory in order to be a user of that directory, so only create more than one directory if you really want to treat it as a completely different set of users.

### create a client token, to user your directory

In order to manage access to a directory, you are able to generate client tokens which can be used to monitor for usage patterns and be revoked in the future if needed.

A client token allows interacting with a specific user directory programmatically, to allow your users to signup, login, and refresh tokens (see the [whodis-client](https://github.com/whodisio/whodis-client) for more details).

```
whodis directory:client:create --directoryUuid=__DIRECTORY_UUID__ --reason=__SOME_REASON__
```

Note: the reason flag allows you to identify which use case a specific client token was created for in the future

### register a custom email to send confirmation codes from, for your directory

By default, whodis sends confirmation code emails to your users from `auth@whodis.com`. You can customize this to send emails from any email you own. To do this, just:

1. Register the email

```
whodis directory:email:set --directoryUuid=__DIRECTORY_UUID__ --email=__EMAIL__
```

2. Confirm your email address, by clicking on the link that amazon will send you

3. Check the status of this email registration

```
whodis directory:email:check --directoryUuid=__DIRECTORY_UUID__ --email=__EMAIL__
```

and you're done.

For better deliverability rates, please also add the `DKIM` required DNS records to your email's domain name's DNS. The desired DNS records will be returned with response of the `whodis directory:email:set` command above.

# Installation

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
* [`whodis directory:client:create`](#whodis-directoryclientcreate)
* [`whodis directory:create`](#whodis-directorycreate)
* [`whodis directory:email:check`](#whodis-directoryemailcheck)
* [`whodis directory:email:set`](#whodis-directoryemailset)
* [`whodis directory:get:test-user-token`](#whodis-directorygettest-user-token)
* [`whodis help [COMMAND]`](#whodis-help-command)
* [`whodis login`](#whodis-login)
* [`whodis logout`](#whodis-logout)
* [`whodis namespace:reserve`](#whodis-namespacereserve)
* [`whodis signup`](#whodis-signup)

## `whodis directory:client:create`

create a client token for accessing a directory

```
USAGE
  $ whodis directory:client:create

OPTIONS
  -d, --directoryUuid=directoryUuid  the uuid of the directory you would like to create a client token for
  -h, --help                         show CLI help

  -r, --reason=reason                what is the reason for needing this client access? (to remind you in the future
                                     what this one is for)

EXAMPLES

  ➜ ./bin/run directory:client:create
  What is the uuid of the directory you would like to create a client token for?: ***
  Why are you creating this client? (This is to remind you in the future what this one is for): ***
  Ok. Creating that that now... done
  Your new client access token is: '***'
    

  ➜ ./bin/run directory:client:create --directoryUuid=***
  Why are you creating this client? (This is to remind you in the future what this one is for): ***
  Ok. Creating that that now... done
  Your new client access token is: '***'
```

## `whodis directory:create`

create a new user directory

```
USAGE
  $ whodis directory:create

OPTIONS
  -h, --help                 show CLI help
  -n, --name=name            What you want to call this user directory
  -s, --namespace=namespace  A namespace you have reserved

EXAMPLES

  ➜ ./bin/run directory:create
  What namespace would you like to create the new user directory in?: ***
  What name would you like to give the new user directory?: ***
  Ok. Creating that now... done
  Your new directory's uuid is '***'
    

  ➜ ./bin/run directory:create --namespace=*** --name=***
  Ok. Creating that now... done
  Your new directory's uuid is '***'
```

## `whodis directory:email:check`

check the status of an email registration for a directory

```
USAGE
  $ whodis directory:email:check

OPTIONS
  -d, --directoryUuid=directoryUuid  the uuid of the directory you would like to check for
  -e, --email=email                  the email address that you would like to check for
  -h, --help                         show CLI help

EXAMPLES

  ➜ ./bin/run directory:email:check
  What is the uuid of the directory you would like to check for?: ***
  What is the email address you would like to check for?: ***
  Ok. Checking that now... done

  The status of this registration is:
     ***
    

  ➜ ./bin/run directory:email:check --directoryUuid=*** --email=***
  Ok. Checking that now... done

  The status of this registration is:
     ***
```

## `whodis directory:email:set`

register an email for a directory

```
USAGE
  $ whodis directory:email:set

OPTIONS
  -d, --directoryUuid=directoryUuid  the uuid of the directory you would like to register an email for
  -e, --email=email                  the email address that you would like to register
  -h, --help                         show CLI help

EXAMPLES

  ➜ ./bin/run directory:email:set
  What is the uuid of the directory you would like to register an email for?: ***
  What is the email address you would like to register?: ***
  Ok. Registering that now... done

  The status of this registration is now:
     ***
    

  ➜ ./bin/run directory:email:set --directoryUuid=*** --email=***
  Ok. Checking that now... done

  The status of this registration is now:
     ***
```

## `whodis directory:get:test-user-token`

get a test user token with customizable expirations

```
USAGE
  $ whodis directory:get:test-user-token

OPTIONS
  -a, --expauth=expauth              number of hours until token can no longer be used for auth
  -d, --directoryUuid=directoryUuid  the uuid of the directory you would like to check for
  -h, --help                         show CLI help
  -r, --exprefresh=exprefresh        number of hours until token can no longer even be refreshed

EXAMPLES

  ➜ ./bin/run directory:get:test-user-token
  What is the directoryUuid for the directory to get a test user token from?: ***
  In how many hours should this token expire?: ***
  In how many hours should this token not even be refreshable?: ***
  Ok. Getting that now... done
  The test user token is:
     ***
    

  ➜ ./bin/run directory:get:test-user-token --directoryUuid=*** expauth=*** exprefresh=***
  Ok. Getting that now... done
  The test user token is:
     ***
```

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

## `whodis login`

login to your Whodis account

```
USAGE
  $ whodis login

OPTIONS
  -h, --help         show CLI help
  -p, --email=email  the email address you would like to login with

EXAMPLES

  ➜ ./bin/run login
  What email would you like to login with?: hello@whodis.io
  Ok. Sending a confirmation code now... done
  What is the confirmation code that was sent to that email?: *****
  Thanks! Confirming that now... done
  You have been successfully logged in!
    

  ➜ ./bin/run login --email=hello@whodis.io
  Ok. Sending a confirmation code now... done
  What is the confirmation code that was sent to that email?: *****
  Thanks! Confirming that now... done
  You have been successfully logged in!
```

_See code: [dist/contract/commands/login.ts](https://github.com/whodisio/whodis-cli/blob/v0.0.0/dist/contract/commands/login.ts)_

## `whodis logout`

logout from your Whodis account

```
USAGE
  $ whodis logout

OPTIONS
  -h, --help  show CLI help

EXAMPLE

  ➜ ./bin/run logout
  Ok. Logging out now... done
```

## `whodis namespace:reserve`

reserve a namespace

```
USAGE
  $ whodis namespace:reserve

OPTIONS
  -h, --help                 show CLI help
  -s, --namespace=namespace  A namespace you would like to manage

EXAMPLES

  ➜ ./bin/run namespace:reserve
  What namespace would you like to reserve?: ***
  Ok. Reserving that now... done
    

  ➜ ./bin/run namespace:reserve --namespace=***
  Ok. Reserving that now... done
```

_See code: [dist/contract/commands/namespace/reserve.ts](https://github.com/whodisio/whodis-cli/blob/v0.0.0/dist/contract/commands/namespace/reserve.ts)_

## `whodis signup`

signup and create a new Whodis account

```
USAGE
  $ whodis signup

OPTIONS
  -h, --help         show CLI help
  -p, --email=email  the email address you would like to signup with

EXAMPLES

  ➜ ./bin/run signup
  What email would you like to signup with?: hello@whodis.io
  Ok. Sending a confirmation code now... done
  What is the confirmation code that was sent to that email?: *****
  Thanks! Confirming that now... done
  You have been successfully signed up!
    

  ➜ ./bin/run signup --email=hello@whodis.io
  Ok. Sending a confirmation code now... done
  What is the confirmation code that was sent to that email?: *****
  Thanks! Confirming that now... done
  You have been successfully signed up!
```

_See code: [dist/contract/commands/signup.ts](https://github.com/whodisio/whodis-cli/blob/v0.0.0/dist/contract/commands/signup.ts)_
<!-- commandsstop -->
