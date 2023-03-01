/* eslint-disable class-methods-use-this */
import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';

import { listNamespaces } from '../../../logic/adminApi/listNamespaces';

// eslint-disable-next-line import/no-default-export
export default class List extends Command {
  static description = 'list namespaces you have admin access of';

  static examples = [
    `
➜ whodis namespace:list
Ok. Looking that up now... done
The namespaces you have admin access to are:
  - ***
  - ***
...
    `,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  async run() {
    // fulfill request
    cli.action.start('Ok. Looking that up now');
    const { namespaces } = await listNamespaces();
    cli.action.stop();
    cli.info(`The namespaces you have admin access to are:
${namespaces.map((namespace) => `- ${namespace}`).join('\n')}`);
  }
}
