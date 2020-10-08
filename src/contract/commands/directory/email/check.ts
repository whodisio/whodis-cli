import cli from 'cli-ux';
import indentString from 'indent-string';

import { Command, flags } from '@oclif/command';

import { checkDirectoryEmail } from '../../../../logic/adminApi/checkDirectoryEmail';

// eslint-disable-next-line import/no-default-export
export default class Check extends Command {
  static description = 'check the status of an email registration for a directory';

  static examples = [
    `
➜ ./bin/run directory:email:check
What is the uuid of the directory you would like to check for?: ***
What is the email address you would like to check for?: ***
Ok. Checking that now... done

The status of this registration is:
  ***
    `,
    `
➜ ./bin/run directory:email:check --directoryUuid=*** --email=***
Ok. Checking that now... done

The status of this registration is:
  ***
    `,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    directoryUuid: flags.string({
      char: 'd',
      description: 'the uuid of the directory you would like to check for',
    }),
    email: flags.string({
      char: 'e',
      description: 'the email address that you would like to check for',
    }),
  };

  async run() {
    const { flags: invokedFlags } = this.parse(Check);

    // define the input
    const directoryUuid = invokedFlags.directoryUuid || (await cli.prompt('What is the uuid of the directory you would like to check for?'));
    const email = invokedFlags.email || (await cli.prompt('What is the email address you would like to check for?'));

    // fulfill request
    cli.action.start('Ok. Checking that now');
    const { registration } = await checkDirectoryEmail({ directoryUuid, email });
    cli.action.stop();
    cli.info(`
The status of this registration is:
${indentString(JSON.stringify(registration, null, 2), 2)}
    `);
  }
}
