import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import indentString from 'indent-string';

import { createDomainProxy } from '../../../../logic/adminApi/createDomainProxy';

// eslint-disable-next-line import/no-default-export
export default class Create extends Command {
  static description = 'create a domain proxy';

  static examples = [
    `
➜ whodis domain:proxy:create
What domain would you like to create the proxy for?: ***
Ok. Doing that now... done

The status of this proxy is:
  ***
    `,
    `
➜ whodis domain:proxy:create --domain=***
Ok. Doing that now... done

The status of this proxy is:
  ***
    `,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    domain: flags.string({
      char: 's',
      description: 'A domain you would like to create a proxy for',
    }),
  };

  async run() {
    const { flags: invokedFlags } = this.parse(Create);

    // define the args
    const domain =
      invokedFlags.domain ||
      (await cli.prompt('What domain would you like to create the proxy for'));

    // fulfill request
    cli.action.start('Ok. Doing that now');
    const proxy = await createDomainProxy({ domain });
    cli.action.stop();
    cli.info(`
The status of this proxy is:
${indentString(JSON.stringify(proxy, null, 2), 2)}
    `);
  }
}
