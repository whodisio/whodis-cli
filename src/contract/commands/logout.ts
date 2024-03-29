import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';

import { forgetTokenForUser } from '../../logic/token/forgetTokenForUser';

// eslint-disable-next-line import/no-default-export
export default class Logout extends Command {
  static description = 'logout from your Whodis account';

  static examples = [
    `
➜ whodis logout
Ok. Logging out now... done
    `,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
  };

  async run() {
    this.parse(Logout);

    // get the challenge
    cli.action.start('Ok. Logging out now');
    await forgetTokenForUser();
    cli.action.stop();
  }
}
