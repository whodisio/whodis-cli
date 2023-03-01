import { Command, flags } from '@oclif/command';
import cli from 'cli-ux';
import {
  answerAuthChallenge,
  askAuthChallenge,
  ChallengeGoal,
  ChallengeType,
  ContactMethodType,
} from 'whodis-client';

import {
  WHODIS_DIRECTORY_CLIENT_TOKEN,
  WHODIS_DIRECTORY_UUID,
} from '../../data/directory';
import { saveTokenForUser } from '../../logic/token/saveTokenForUser';
import { withRetry } from '../../utils/wrappers/withRetry';

// eslint-disable-next-line import/no-default-export
export default class Login extends Command {
  static description = 'login to your Whodis account';

  static examples = [
    `
➜ whodis login
What email would you like to login with?: hello@whodis.io
Ok. Sending a confirmation code now... done
What is the confirmation code that was sent to that email?: *****
Thanks! Confirming that now... done
You have been successfully logged in!
    `,
    `
➜ whodis login --email=hello@whodis.io
Ok. Sending a confirmation code now... done
What is the confirmation code that was sent to that email?: *****
Thanks! Confirming that now... done
You have been successfully logged in!
    `,
  ];

  static flags = {
    help: flags.help({ char: 'h' }),
    email: flags.string({
      char: 'p',
      description: 'the email address you would like to login with',
    }),
  };

  async run() {
    const { flags: invokedFlags } = this.parse(Login);

    // define the email
    const email =
      invokedFlags.email ||
      (await cli.prompt('What email would you like to login with?'));

    // get the challenge
    cli.action.start('Ok. Sending a confirmation code now');
    const { challengeUuid } = await askAuthChallenge({
      directoryUuid: WHODIS_DIRECTORY_UUID,
      clientUuid: WHODIS_DIRECTORY_CLIENT_TOKEN,
      goal: ChallengeGoal.LOGIN,
      type: ChallengeType.CONFIRMATION_CODE,
      contactMethod: { type: ContactMethodType.EMAIL, address: email },
    });
    cli.action.stop();

    // with a retry, try to answer the challenge for user. (retry -> give two attempts)
    const token = await withRetry(async () => {
      // get the confirmation code from user
      const confirmationCode = await cli.prompt(
        'What is the confirmation code that was sent to that email?',
      );

      // answer the challenge
      cli.action.start('Thanks! Confirming that now');
      const result = await answerAuthChallenge({
        challengeUuid,
        challengeAnswer: confirmationCode,
      });
      cli.action.stop();
      return result.token;
    })();

    // save the token in users environment
    await saveTokenForUser({ token });
    cli.info('You have been successfully logged in!');
  }
}
