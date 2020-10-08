import cli from 'cli-ux';
import indentString from 'indent-string';

import { Command, flags } from '@oclif/command';

import { setDirectoryEmail } from '../../../../logic/adminApi/setDirectoryEmail';

// eslint-disable-next-line import/no-default-export
export default class Set extends Command {
  static description = 'register an email for a directory';

  static examples = [
    `
➜ ./bin/run directory:email:set
What is the uuid of the directory you would like to register an email for?: ***
What is the email address you would like to register?: ***
Ok. Registering that now... done

The status of this registration is now:
  ***
    `.trim(),
    `
➜ ./bin/run directory:email:set --directoryUuid=*** --email=***
Ok. Checking that now... done

The status of this registration is now:
  ***
    `.trim(),
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    directoryUuid: flags.string({
      char: 'd',
      description: 'the uuid of the directory you would like to register an email for',
    }),
    email: flags.string({
      char: 'e',
      description: 'the email address that you would like to register',
    }),
  };

  async run() {
    const { flags: invokedFlags } = this.parse(Set);

    // define the input
    const directoryUuid =
      invokedFlags.directoryUuid || (await cli.prompt('What is the uuid of the directory you would like to register an email for?'));
    const email = invokedFlags.email || (await cli.prompt('What is the email address you would like to register?'));

    // fulfill request
    cli.action.start('Ok. Registering that now');
    const { registration } = await setDirectoryEmail({ directoryUuid, email });
    cli.action.stop();
    cli.info(`
The status of this registration is now:
${indentString(JSON.stringify(registration, null, 2), 2)}
    `);
  }
}
