import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';

import { setDirectoryOidcCredentials } from '../../../../../logic/adminApi/setDirectoryOidcCredentials';

// eslint-disable-next-line import/no-default-export
export default class TestUserToken extends Command {
  static description = 'set the oidc credentials of a directory';

  static examples = [
    `
➜ whodis directory:oidc:credentials:set
What is the directoryUuid of the directory to set the credentials to?: ***
What is the name of the identity provider these credentials are from? (e.g., APPLE, GOOGLE, FACEBOOK, etc): ***
What is the client id of these credentials?: ***
What is the client secret of these credentials? (type 'null' if not applicable): ***
What is the client private key of these credentials? (type 'null' if not applicable): null
Ok. Setting that now... done
Success:
  true
    `,
    `
➜ whodis directory:oidc:credentials:set --directoryUuid=*** --provider=*** --clientId=*** --clientSecret=*** --clientPrivateKey=***
Ok. Setting that now... done
Success:
  true
    `,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    directoryUuid: flags.string({
      char: 'd',
      description:
        'the uuid of the directory you would like to set the credentials to',
    }),
    provider: flags.string({
      char: 'p',
      description:
        'the name of the identity provider these credentials are from (e.g., APPLE, GOOGLE, FACEBOOK, etc)',
    }),
    clientId: flags.string({
      char: 'i',
      description: 'the client id of the credentials',
    }),
    clientSecret: flags.string({
      char: 's',
      description: 'the client secret of the credentials, if applicable',
    }),
    clientPrivateKey: flags.string({
      char: 'k',
      description: 'the client private key of the credentials, if applicable',
    }),
  };

  async run() {
    const { flags: invokedFlags } = this.parse(TestUserToken);

    // define the email
    const directoryUuid =
      invokedFlags.directoryUuid ||
      (await cli.prompt(
        'What is the directoryUuid of the directory to set the credentials to?',
      ));
    const provider =
      invokedFlags.provider ||
      (await cli.prompt(
        'What is the name of the identity provider these credentials are from? (e.g., APPLE, GOOGLE, FACEBOOK, etc)',
      ));
    const clientId =
      invokedFlags.clientId ||
      (await cli.prompt('What is the client id of these credentials?'));
    const clientSecret =
      invokedFlags.clientSecret ||
      (await cli.prompt(
        "What is the client secret of these credentials? (type 'null' if not applicable)",
      )) ||
      null;
    const clientPrivateKey =
      invokedFlags.clientPrivateKey ||
      (await cli.prompt(
        "What is the client private key of these credentials? (type 'null' if not applicable)",
      ));

    // fulfill request
    cli.action.start('Ok. Setting that now');
    const { success } = await setDirectoryOidcCredentials({
      directoryUuid,
      provider,
      clientId,
      clientSecret:
        clientSecret.toLowerCase().trim() === 'null' ? null : clientSecret,
      clientPrivateKey:
        clientPrivateKey.toLowerCase().trim() === 'null'
          ? null
          : clientPrivateKey,
    });
    cli.action.stop();
    cli.info(
      `Success:
  ${success}
   `.trim(),
    );
  }
}
