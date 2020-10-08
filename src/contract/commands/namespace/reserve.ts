import cli from 'cli-ux';

import { Command, flags } from '@oclif/command';

import { reserveNamespace } from '../../../logic/adminApi/reserveNamespace';

// eslint-disable-next-line import/no-default-export
export default class Reserve extends Command {
  static description = 'reserve a namespace';

  static examples = [
    `
➜ ./bin/run namespace:reserve
What namespace would you like to reserve?: ***
Ok. Reserving that now... done
    `.trim(),
    `
➜ ./bin/run namespace:reserve --namespace=***
Ok. Reserving that now... done
    `.trim(),
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    namespace: flags.string({
      char: 's',
      description: 'A namespace you would like to manage',
    }),
  };

  async run() {
    const { flags: invokedFlags } = this.parse(Reserve);

    // define the email
    const namespace = invokedFlags.namespace || (await cli.prompt('What namespace would you like to reserve?'));

    // fulfill request
    cli.action.start('Ok. Reserving that now');
    await reserveNamespace({ namespace });
    cli.action.stop();
  }
}
