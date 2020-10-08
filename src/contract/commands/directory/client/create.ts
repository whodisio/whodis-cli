import cli from 'cli-ux';

import { Command, flags } from '@oclif/command';

import { createDirectoryClient } from '../../../../logic/adminApi/createDirectoryClient';

// eslint-disable-next-line import/no-default-export
export default class Set extends Command {
  static description = 'create a client token for accessing a directory';

  static examples = [
    `
➜ ./bin/run directory:client:create
What is the uuid of the directory you would like to create a client token for?: ***
Why are you creating this client? (This is to remind you in the future what this one is for): ***
Ok. Creating that that now... done
Your new client access token is: '***'
    `.trim(),
    `
➜ ./bin/run directory:client:create --directoryUuid=***
Why are you creating this client? (This is to remind you in the future what this one is for): ***
Ok. Creating that that now... done
Your new client access token is: '***'
    `.trim(),
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    directoryUuid: flags.string({
      char: 'd',
      description: 'the uuid of the directory you would like to create a client token for',
    }),
    reason: flags.string({
      char: 'r',
      description: 'what is the reason for needing this client access? (to remind you in the future what this one is for)',
    }),
  };

  async run() {
    const { flags: invokedFlags } = this.parse(Set);

    // define the input
    const directoryUuid =
      invokedFlags.directoryUuid || (await cli.prompt('What is the uuid of the directory you would like to create a client token for?'));
    const reason =
      invokedFlags.reason || (await cli.prompt('Why are you creating this client? (This is to remind you in the future what this one is for)'));

    // fulfill request
    cli.action.start('Ok. Creating that that now');
    const { clientToken } = await createDirectoryClient({ directoryUuid, reason });
    cli.action.stop();
    cli.info(`Your new client access token is: '${clientToken}'`);
  }
}
