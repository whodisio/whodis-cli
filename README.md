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
whodis directory:create --namespace=__YOUR_APPS_NAME__ --name=__TYPE_OF_USER__
```

Some applications use different user directories for different types of users (e.g., customers -vs- delivery drivers). Others only have one type of user.

A user must sign up to each user directory in order to be a user of that directory, so only create more than one directory if you really want to treat it as a completely different set of users.

### create a client token, to user your directory

In order to manage access to a directory, you are able to create clients. These are used to specify which particular audiences JWTs generated with it are for, monitor for usage patterns, and be revoked in the future if needed.

A client allows interacting with a specific user directory programmatically, to allow your users to signup, login, and refresh tokens (see the [whodis-client](https://github.com/whodisio/whodis-client) for more details).

```
whodis directory:client:create --directoryUuid=__DIRECTORY_UUID__  --audienceUri=__AUDIENCE_URI__ --reason=__SOME_REASON__
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

### setup a domain proxy to be able to securely store JWTs for the web

If you're setting up authentication for a website, then you'll need a domain proxy in order to be able to securely store and send authentication cookies. Whodis can create this proxy for you - requiring you only to verify ownership of your domain and add a CNAME to your domain's DNS.

To have whodis setup the proxy for you

1. claim ownership of the domain

```
whodis domain:ownership:claim --domain=__YOUR_DOMAIN__
```

_example domain: `yourdomain.com`_

2. add the verification DNS records returned in the response from ownership:claim to your domain's DNS

3. wait a few minutes, then confirm that your domain ownership claims is now `VERIFIED`.

```
whodis domain:ownership:check --domain=__YOUR_DOMAIN__
```

_note: try again in a few more minutes if it still hasn't verified, DNS changes sometimes take some time to propagate_

4. create a domain proxy now that you have verified ownership over the domain

```
whodis domain:proxy:create --domain=__YOUR_DOMAIN__
```

5. add the proxy forwarding DNS record returned in the response from proxy:create to your domain's DNS

6. check that the proxy was successfully created

```
whodis domain:proxy:check --domain=__YOUR_DOMAIN__
```

And you're done! Whodis is now hosting a proxy that automatically routes requests from `auth.__YOUR_DOMAIN__` to `api.whodis.io` for you.

##### why is this needed?

In the web environment, the only safe place to store a JWT is an HTTPSOnly, Secure, Same-site cookie. In order to receive and send this cookie, however, the cookie needs to be set by the same-site as your website - and will only be sent to the same-site as your website. Fortunately, browsers consider subdomains as the same-site; so, with a proxy that forwards requests from `auth.yourdomain.com` to `api.whodis.io`, `www.yourdomain.com` is able to get cookies from the whodis api - and later send them to `api.yourdomain.com`.

This does not affect native platforms (e.g., android, ios, the terminal) because native platforms aren't exposed to as many vulnerabilities as browsers are (e.g., they have secure storage available).

### generate api key, to programmatically manage your directory

In order to programmatically access and manage user data with the [whodis-sdk](github.com/whodisio/whodis-sdk) you need an api key. Fortunately, it is really easy to generate one.

⚠️ Your private key is like a password. Make sure to keep it secure! ⚠️

```
whodis directory:apikey:generate --directoryUuid=__DIRECTORY_UUID__
```

# Installation

<!-- usage -->
```sh-session
$ npm install -g whodis-cli
$ whodis COMMAND
running command...
$ whodis (-v|--version|version)
whodis-cli/0.3.0 linux-x64 node-v18.12.1
$ whodis --help [COMMAND]
USAGE
  $ whodis COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`whodis directory:apikey:generate`](#whodis-directoryapikeygenerate)
* [`whodis directory:client:create`](#whodis-directoryclientcreate)
* [`whodis directory:create`](#whodis-directorycreate)
* [`whodis directory:email:check`](#whodis-directoryemailcheck)
* [`whodis directory:email:set`](#whodis-directoryemailset)
* [`whodis directory:list`](#whodis-directorylist)
* [`whodis directory:test-user:generate-token`](#whodis-directorytest-usergenerate-token)
* [`whodis domain:ownership:check`](#whodis-domainownershipcheck)
* [`whodis domain:ownership:claim`](#whodis-domainownershipclaim)
* [`whodis domain:proxy:check`](#whodis-domainproxycheck)
* [`whodis domain:proxy:create`](#whodis-domainproxycreate)
* [`whodis help [COMMAND]`](#whodis-help-command)
* [`whodis login`](#whodis-login)
* [`whodis logout`](#whodis-logout)
* [`whodis namespace:list`](#whodis-namespacelist)
* [`whodis namespace:reserve`](#whodis-namespacereserve)
* [`whodis signup`](#whodis-signup)

## `whodis directory:apikey:generate`

create an apikey to programmatically manage a directory

```
USAGE
  $ whodis directory:apikey:generate

OPTIONS
  -d, --directoryUuid=directoryUuid  the uuid of the directory you would like to create a client token for
  -h, --help                         show CLI help

EXAMPLES

  ➜ whodis directory:apikey:generate
  What is the uuid of the directory you would like to generate an apikey for?: ***
  Ok. Generating that that now... done
  Your new public key: '***'
  Your new private key: '***'
  ⚠️ Your private key is like a password. Make sure to keep it secure! ⚠️
    

  ➜ whodis directory:apikey:generate --directoryUuid=***
  Ok. Creating that that now... done
  Your new public key: '***'
  Your new private key: '***'
  ⚠️ Your private key is like a password. Make sure to keep it secure! ⚠️
```

## `whodis directory:client:create`

create a client token for accessing a directory

```
USAGE
  $ whodis directory:client:create

OPTIONS
  -a, --audienceUri=audienceUri      the uri of the intended audience you want tokens issued with this client for (e.g.,
                                     `https://api.yourdomain.com`)

  -d, --directoryUuid=directoryUuid  the uuid of the directory you would like to create a client token for

  -h, --help                         show CLI help

  -r, --reason=reason                what is the reason for needing this client access? (to remind you in the future
                                     what this one is for)

EXAMPLES

  ➜ whodis directory:client:create
  What is the uuid of the directory you would like to create a client token for?: ***
  What is the uri of the intended audience you want tokens issued with this client for? (e.g., 
  `https://api.yourdomain.com`): ***
  Why are you creating this client? (This is to remind you in the future what this one is for): ***
  Ok. Creating that that now... done
  Your new client access token is: '***'
    

  ➜ whodis directory:client:create --directoryUuid=*** --audienceUri=***
  Why are you creating this client? (This is to remind you in the future what this one is for): ***
  Ok. Creating that that now... done
  Your new client access token is: '***'
```

_See code: [dist/contract/commands/directory/client/create.ts](https://github.com/whodisio/whodis-cli/blob/v0.3.0/dist/contract/commands/directory/client/create.ts)_

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

  ➜ whodis directory:create
  What namespace would you like to create the new user directory in?: ***
  What name would you like to give the new user directory?: ***
  Ok. Creating that now... done
  Your new directory's uuid is:
     '***'
    

  ➜ whodis directory:create --namespace=*** --name=***
  Ok. Creating that now... done
  Your new directory's uuid is:
     '***'
```

_See code: [dist/contract/commands/directory/create.ts](https://github.com/whodisio/whodis-cli/blob/v0.3.0/dist/contract/commands/directory/create.ts)_

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

  ➜ whodis directory:email:check
  What is the uuid of the directory you would like to check for?: ***
  What is the email address you would like to check for?: ***
  Ok. Checking that now... done

  The status of this registration is:
     ***
    

  ➜ whodis directory:email:check --directoryUuid=*** --email=***
  Ok. Checking that now... done

  The status of this registration is:
     ***
```

_See code: [dist/contract/commands/directory/email/check.ts](https://github.com/whodisio/whodis-cli/blob/v0.3.0/dist/contract/commands/directory/email/check.ts)_

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

  ➜ whodis directory:email:set
  What is the uuid of the directory you would like to register an email for?: ***
  What is the email address you would like to register?: ***
  Ok. Registering that now... done

  The status of this registration is now:
     ***
    

  ➜ whodis directory:email:set --directoryUuid=*** --email=***
  Ok. Registering that now... done

  The status of this registration is now:
     ***
```

_See code: [dist/contract/commands/directory/email/set.ts](https://github.com/whodisio/whodis-cli/blob/v0.3.0/dist/contract/commands/directory/email/set.ts)_

## `whodis directory:list`

list the directories in a namespace you have admin access of

```
USAGE
  $ whodis directory:list

OPTIONS
  -h, --help                 show CLI help
  -s, --namespace=namespace  A namespace you have reserved

EXAMPLES

  ➜ whodis directory:list
  What namespace would you like to list the directories of?: ***
  Ok. Looking that up now... done
  The directories in this namespace are:
     - ***
     - ***
    

  ➜ whodis directory:list --namespace=***
  Ok. Looking that up now... done
  The directories in this namespace are:
     - ***
     - ***
  ...
```

_See code: [dist/contract/commands/directory/list.ts](https://github.com/whodisio/whodis-cli/blob/v0.3.0/dist/contract/commands/directory/list.ts)_

## `whodis directory:test-user:generate-token`

get a test user token with customizable expirations

```
USAGE
  $ whodis directory:test-user:generate-token

OPTIONS
  -a, --audienceUri=audienceUri      the uri of the intended audience of this token
  -a, --expauth=expauth              number of hours until token can no longer be used for auth
  -d, --directoryUuid=directoryUuid  the uuid of the directory you would like to check for
  -h, --help                         show CLI help
  -r, --exprefresh=exprefresh        number of hours until token can no longer even be refreshed

EXAMPLES

  ➜ whodis directory:test-user:generate-token
  What is the directoryUuid for the directory to get a test user token from?: ***
  What is the uri of the intended audience of this token?: ***
  In how many hours should this token expire?: ***
  In how many hours should this token not even be refreshable?: ***
  Ok. Getting that now... done
  The test user token is:
     ***
    

  ➜ whodis directory:test-user:generate-token --directoryUuid=*** --audienceUri=*** --expauth=*** --exprefresh=***
  Ok. Getting that now... done
  The test user token is:
     ***
```

_See code: [dist/contract/commands/directory/test-user/generate-token.ts](https://github.com/whodisio/whodis-cli/blob/v0.3.0/dist/contract/commands/directory/test-user/generate-token.ts)_

## `whodis domain:ownership:check`

check the status of a domain ownership claim

```
USAGE
  $ whodis domain:ownership:check

OPTIONS
  -h, --help           show CLI help
  -s, --domain=domain  A domain you would like to check ownership claim status for

EXAMPLES

  ➜ whodis domain:ownership:check
  What domain would you like to check an ownership claim for?: ***
  Ok. Checking that now... done

  The status of this ownership claim is:
     ***
    

  ➜ whodis domain:ownership:check --domain=***
  Ok. Checking that now... done

  The status of this ownership claim is:
     ***
```

_See code: [dist/contract/commands/domain/ownership/check.ts](https://github.com/whodisio/whodis-cli/blob/v0.3.0/dist/contract/commands/domain/ownership/check.ts)_

## `whodis domain:ownership:claim`

claim ownership of a domain

```
USAGE
  $ whodis domain:ownership:claim

OPTIONS
  -h, --help           show CLI help
  -s, --domain=domain  The domain you would like to claim ownership of

EXAMPLES

  ➜ whodis domain:ownership:claim
  What domain would you like to claim ownership of?: ***
  Ok. Doing that now... done

  The status of this ownership claim is:
     ***
    

  ➜ whodis domain:ownership:claim --domain=***
  Ok. Doing that now... done

  The status of this ownership claim is:
     ***
```

_See code: [dist/contract/commands/domain/ownership/claim.ts](https://github.com/whodisio/whodis-cli/blob/v0.3.0/dist/contract/commands/domain/ownership/claim.ts)_

## `whodis domain:proxy:check`

check the status of a domain proxy

```
USAGE
  $ whodis domain:proxy:check

OPTIONS
  -h, --help           show CLI help
  -s, --domain=domain  A domain you would like to check the status of a proxy for

EXAMPLES

  ➜ whodis domain:proxy:check
  What domain would you like to check the proxy of?: ***
  Ok. Checking that now... done

  The status of this proxy is:
     ***
    

  ➜ whodis domain:proxy:check --domain=***
  Ok. Checking that now... done

  The status of this proxy is:
     ***
```

_See code: [dist/contract/commands/domain/proxy/check.ts](https://github.com/whodisio/whodis-cli/blob/v0.3.0/dist/contract/commands/domain/proxy/check.ts)_

## `whodis domain:proxy:create`

create a domain proxy

```
USAGE
  $ whodis domain:proxy:create

OPTIONS
  -h, --help           show CLI help
  -s, --domain=domain  A domain you would like to create a proxy for

EXAMPLES

  ➜ whodis domain:proxy:create
  What domain would you like to create the proxy for?: ***
  Ok. Doing that now... done

  The status of this proxy is:
     ***
    

  ➜ whodis domain:proxy:create --domain=***
  Ok. Doing that now... done

  The status of this proxy is:
     ***
```

_See code: [dist/contract/commands/domain/proxy/create.ts](https://github.com/whodisio/whodis-cli/blob/v0.3.0/dist/contract/commands/domain/proxy/create.ts)_

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

  ➜ whodis login
  What email would you like to login with?: hello@whodis.io
  Ok. Sending a confirmation code now... done
  What is the confirmation code that was sent to that email?: *****
  Thanks! Confirming that now... done
  You have been successfully logged in!
    

  ➜ whodis login --email=hello@whodis.io
  Ok. Sending a confirmation code now... done
  What is the confirmation code that was sent to that email?: *****
  Thanks! Confirming that now... done
  You have been successfully logged in!
```

_See code: [dist/contract/commands/login.ts](https://github.com/whodisio/whodis-cli/blob/v0.3.0/dist/contract/commands/login.ts)_

## `whodis logout`

logout from your Whodis account

```
USAGE
  $ whodis logout

OPTIONS
  -h, --help  show CLI help

EXAMPLE

  ➜ whodis logout
  Ok. Logging out now... done
```

_See code: [dist/contract/commands/logout.ts](https://github.com/whodisio/whodis-cli/blob/v0.3.0/dist/contract/commands/logout.ts)_

## `whodis namespace:list`

list namespaces you have admin access of

```
USAGE
  $ whodis namespace:list

OPTIONS
  -h, --help  show CLI help

EXAMPLE

  ➜ whodis namespace:list
  Ok. Looking that up now... done
  The namespaces you have admin access to are:
     - ***
     - ***
  ...
```

_See code: [dist/contract/commands/namespace/list.ts](https://github.com/whodisio/whodis-cli/blob/v0.3.0/dist/contract/commands/namespace/list.ts)_

## `whodis namespace:reserve`

reserve a namespace

```
USAGE
  $ whodis namespace:reserve

OPTIONS
  -h, --help                 show CLI help
  -s, --namespace=namespace  A namespace you would like to manage

EXAMPLES

  ➜ whodis namespace:reserve
  What namespace would you like to reserve?: ***
  Ok. Reserving that now... done
    

  ➜ whodis namespace:reserve --namespace=***
  Ok. Reserving that now... done
```

_See code: [dist/contract/commands/namespace/reserve.ts](https://github.com/whodisio/whodis-cli/blob/v0.3.0/dist/contract/commands/namespace/reserve.ts)_

## `whodis signup`

signup and create a new Whodis account

```
USAGE
  $ whodis signup

OPTIONS
  -h, --help         show CLI help
  -p, --email=email  the email address you would like to signup with

EXAMPLES

  ➜ whodis signup
  What email would you like to signup with?: hello@whodis.io
  Ok. Sending a confirmation code now... done
  What is the confirmation code that was sent to that email?: *****
  Thanks! Confirming that now... done
  You have been successfully signed up!
    

  ➜ whodis signup --email=hello@whodis.io
  Ok. Sending a confirmation code now... done
  What is the confirmation code that was sent to that email?: *****
  Thanks! Confirming that now... done
  You have been successfully signed up!
```

_See code: [dist/contract/commands/signup.ts](https://github.com/whodisio/whodis-cli/blob/v0.3.0/dist/contract/commands/signup.ts)_
<!-- commandsstop -->
