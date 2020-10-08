import { saveTokenForUser } from './saveTokenForUser';

export const forgetTokenForUser = async () => saveTokenForUser({ token: '' }); // wipes it
