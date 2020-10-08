import cli from 'cli-ux';

import { Command, flags } from '@oclif/command';

import { createDirectory } from '../../../logic/adminApi/createDirectory';

// eslint-disable-next-line import/no-default-export
export default class Create extends Command {
  static description = 'create a new user directory';

  static examples = [
    `
➜ ./bin/run directory:create
What namespace would you like to create the new user directory in?: ***
What name would you like to give the new user directory?: ***
Ok. Creating that now... done
Your new directory's uuid is:
  '***'
    `,
    `
➜ ./bin/run directory:create --namespace=*** --name=***
Ok. Creating that now... done
Your new directory's uuid is:
  '***'
    `,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    namespace: flags.string({
      char: 's',
      description: 'A namespace you have reserved',
    }),
    name: flags.string({
      char: 'n',
      description: 'What you want to call this user directory',
    }),
  };

  async run() {
    const { flags: invokedFlags } = this.parse(Create);

    // define the input
    const namespace = invokedFlags.namespace || (await cli.prompt('What namespace would you like to create the new user directory in?'));
    const name = invokedFlags.name || (await cli.prompt('What name would you like to give the new user directory?'));

    // fulfill request
    cli.action.start('Ok. Creating that now');
    const { directoryUuid } = await createDirectory({ namespace, name });
    cli.action.stop();
    cli.info(`Your new directory's uuid is:
  '${directoryUuid}'`);
  }
}
