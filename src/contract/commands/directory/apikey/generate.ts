import cli from 'cli-ux';

import { Command, flags } from '@oclif/command';

import { generateDirectoryApikey } from '../../../../logic/adminApi/generateDirectoryApikey';

// eslint-disable-next-line import/no-default-export
export default class Generate extends Command {
  static description = 'create an apikey to programmatically manage a directory';

  static examples = [
    `
➜ whodis directory:apikey:generate
What is the uuid of the directory you would like to generate an apikey for?: ***
Ok. Generating that that now... done
Your new public key: '***'
Your new private key: '***'
⚠️ Your private key is like a password. Make sure to keep it secure! ⚠️
    `,
    `
➜ whodis directory:apikey:generate --directoryUuid=***
Ok. Creating that that now... done
Your new public key: '***'
Your new private key: '***'
⚠️ Your private key is like a password. Make sure to keep it secure! ⚠️
    `,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    directoryUuid: flags.string({
      char: 'd',
      description: 'the uuid of the directory you would like to create an apikey for?',
    }),
  };

  async run() {
    const { flags: invokedFlags } = this.parse(Generate);

    // define the input
    const directoryUuid =
      invokedFlags.directoryUuid || (await cli.prompt('What is the uuid of the directory you would like to create an apikey for?'));

    // fulfill request
    cli.action.start('Ok. Creating that that now');
    const { clientPrivateKey, clientPublicKey } = await generateDirectoryApikey({ directoryUuid });
    cli.action.stop();
    cli.info(`Your new public key is: '${clientPublicKey}'`);
    cli.info(`Your new private key is: '${clientPrivateKey}'`);
    cli.info(`⚠️ Your private key is like a password. Make sure to keep it secure! ⚠️`);
  }
}
