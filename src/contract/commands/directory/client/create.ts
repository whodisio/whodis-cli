import cli from 'cli-ux';

import { Command, flags } from '@oclif/command';

import { createDirectoryClient } from '../../../../logic/adminApi/createDirectoryClient';

// eslint-disable-next-line import/no-default-export
export default class Set extends Command {
  static description = 'create a client token for accessing a directory';

  static examples = [
    `
➜ whodis directory:client:create
What is the uuid of the directory you would like to create a client token for?: ***
What is the uri of the intended audience you want tokens issued with this client for? (e.g., \`https://api.yourdomain.com\`): ***
Why are you creating this client? (This is to remind you in the future what this one is for): ***
Ok. Creating that that now... done
Your new client access token is: '***'
    `,
    `
➜ whodis directory:client:create --directoryUuid=*** --audienceUri=***
Why are you creating this client? (This is to remind you in the future what this one is for): ***
Ok. Creating that that now... done
Your new client access token is: '***'
    `,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    directoryUuid: flags.string({
      char: 'd',
      description: 'the uuid of the directory you would like to create a client token for',
    }),
    audienceUri: flags.string({
      char: 'a',
      description: 'the uri of the intended audience you want tokens issued with this client for (e.g., `https://api.yourdomain.com`)',
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
    const audienceUri =
      invokedFlags.audienceUri ||
      (await cli.prompt(
        'What is the uri of the intended audience you want tokens issued with this client for? (e.g., `https://api.yourdomain.com`)',
      ));
    const reason =
      invokedFlags.reason || (await cli.prompt('Why are you creating this client? (This is to remind you in the future what this one is for)'));

    // fulfill request
    cli.action.start('Ok. Creating that that now');
    const { clientUuid } = await createDirectoryClient({ directoryUuid, audienceUri, reason });
    cli.action.stop();
    cli.info(`Your new client access token is: '${clientUuid}'`);
  }
}
