import cli from 'cli-ux';
import indentString from 'indent-string';

import { Command, flags } from '@oclif/command';

import { checkDomainProxy } from '../../../../logic/adminApi/checkDomainProxy';

// eslint-disable-next-line import/no-default-export
export default class Check extends Command {
  static description = 'check the status of a domain proxy';

  static examples = [
    `
➜ whodis domain:proxy:check
What domain would you like to check the proxy of?: ***
Ok. Checking that now... done

The status of this proxy is:
  ***
    `,
    `
➜ whodis domain:proxy:check --domain=***
Ok. Checking that now... done

The status of this proxy is:
  ***
    `,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    domain: flags.string({
      char: 's',
      description: 'A domain you would like to check the status of a proxy for',
    }),
  };

  async run() {
    const { flags: invokedFlags } = this.parse(Check);

    // define the args
    const domain = invokedFlags.domain || (await cli.prompt('What domain would you like to check the proxy of?'));

    // fulfill request
    cli.action.start('Ok. Checking that now');
    const proxy = await checkDomainProxy({ domain });
    cli.action.stop();
    cli.info(`
The status of this proxy is:
${indentString(JSON.stringify(proxy, null, 2), 2)}
    `);
  }
}
