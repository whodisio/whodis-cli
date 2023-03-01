import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import indentString from 'indent-string';

import { claimDomainOwnership } from '../../../../logic/adminApi/claimDomainOwnership';

// eslint-disable-next-line import/no-default-export
export default class Claim extends Command {
  static description = 'claim ownership of a domain';

  static examples = [
    `
➜ whodis domain:ownership:claim
What domain would you like to claim ownership of?: ***
Ok. Doing that now... done

The status of this ownership claim is:
  ***
    `,
    `
➜ whodis domain:ownership:claim --domain=***
Ok. Doing that now... done

The status of this ownership claim is:
  ***
    `,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    domain: flags.string({
      char: 's',
      description: 'The domain you would like to claim ownership of',
    }),
  };

  async run() {
    const { flags: invokedFlags } = this.parse(Claim);

    // define the args
    const domain =
      invokedFlags.domain ||
      (await cli.prompt('What domain would you like to claim ownership of?'));

    // fulfill request
    cli.action.start('Ok. Doing that now');
    const ownership = await claimDomainOwnership({ domain });
    cli.action.stop();
    cli.info(`
The status of this domain ownership is:
${indentString(JSON.stringify(ownership, null, 2), 2)}
    `);
  }
}
