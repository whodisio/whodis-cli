/* eslint-disable class-methods-use-this */
import cli from 'cli-ux';

import { Command, flags } from '@oclif/command';

import { listDirectories } from '../../../logic/adminApi/listDirectories';

// eslint-disable-next-line import/no-default-export
export default class List extends Command {
  static description = 'list the directories in a namespace you have admin access of';

  static examples = [
    `
➜ whodis directory:list
What namespace would you like to list the directories of?: ***
Ok. Looking that up now... done
The directories in this namespace are:
  - ***
  - ***
    `,
    `
➜ whodis directory:list --namespace=***
Ok. Looking that up now... done
The directories in this namespace are:
  - ***
  - ***
...
    `,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    namespace: flags.string({
      char: 's',
      description: 'A namespace you have reserved',
    }),
  };

  async run() {
    const { flags: invokedFlags } = this.parse(List);

    // define the input
    const namespace = invokedFlags.namespace || (await cli.prompt('What namespace would you like to list the directories of?'));

    // fulfill request
    cli.action.start('Ok. Looking that up now');
    const { directories } = await listDirectories({ namespace });
    cli.action.stop();
    cli.info(`The directories in this namespace are:
${directories.map((directory) => `- ${directory}`).join('\n')}`);
  }
}
