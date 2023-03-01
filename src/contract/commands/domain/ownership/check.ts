import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import indentString from 'indent-string';

import { checkDomainOwnership } from '../../../../logic/adminApi/checkDomainOwnership';

// eslint-disable-next-line import/no-default-export
export default class Check extends Command {
  static description = 'check the status of a domain ownership claim';

  static examples = [
    `
➜ whodis domain:ownership:check
What domain would you like to check an ownership claim for?: ***
Ok. Checking that now... done

The status of this ownership claim is:
  ***
    `,
    `
➜ whodis domain:ownership:check --domain=***
Ok. Checking that now... done

The status of this ownership claim is:
  ***
    `,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    domain: flags.string({
      char: 's',
      description:
        'A domain you would like to check ownership claim status for',
    }),
  };

  async run() {
    const { flags: invokedFlags } = this.parse(Check);

    // define the args
    const domain =
      invokedFlags.domain ||
      (await cli.prompt(
        'What domain would you like to check an ownership claim for?',
      ));

    // fulfill request
    cli.action.start('Ok. Checking that now');
    const ownership = await checkDomainOwnership({ domain });
    cli.action.stop();
    cli.info(`
The status of this domain ownership is:
${indentString(JSON.stringify(ownership, null, 2), 2)}
    `);
  }
}
