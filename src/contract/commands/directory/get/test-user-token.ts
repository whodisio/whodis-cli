import cli from 'cli-ux';

import { Command, flags } from '@oclif/command';

import { getTestUserToken } from '../../../../logic/adminApi/getTestUserToken';

// eslint-disable-next-line import/no-default-export
export default class TestUserToken extends Command {
  static description = 'get a test user token with customizable expirations';

  static examples = [
    `
➜ ./bin/run directory:get:test-user-token
What is the directoryUuid for the directory to get a test user token from?: ***
In how many hours should this token expire?: ***
In how many hours should this token not even be refreshable?: ***
Ok. Getting that now... done
The test user token is:
  ***
    `.trim(),
    `
➜ ./bin/run directory:get:test-user-token --directoryUuid=*** expauth=*** exprefresh=***
Ok. Getting that now... done
The test user token is:
  ***
    `.trim(),
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    directoryUuid: flags.string({
      char: 'd',
      description: 'the uuid of the directory you would like to check for',
    }),
    expauth: flags.integer({
      char: 'a',
      description: 'number of hours until token can no longer be used for auth',
    }),
    exprefresh: flags.integer({
      char: 'r',
      description: 'number of hours until token can no longer even be refreshed',
    }),
  };

  async run() {
    const { flags: invokedFlags } = this.parse(TestUserToken);

    // define the email
    const directoryUuid =
      invokedFlags.directoryUuid || (await cli.prompt('What is the directoryUuid for the directory to get a test user token from?'));
    const forAuth = invokedFlags.expauth || (await cli.prompt('In how many hours should this token expire?'));
    const forRefresh = invokedFlags.exprefresh || (await cli.prompt('In how many hours should this token not even be refreshable?'));

    // fulfill request
    cli.action.start('Ok. Getting that now');
    const { token } = await getTestUserToken({ directoryUuid, expirationInHours: { forAuth, forRefresh } });
    cli.action.stop();
    cli.info(
      `The test user token is:
  ${token}
   `.trim(),
    );
  }
}
