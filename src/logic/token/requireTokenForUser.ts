import { getTokenForUser } from './getTokenForUser';

export const requireTokenForUser = async () => {
  const token = await getTokenForUser();
  if (!token)
    throw new Error('Whodis? You must be logged in before you can do that.');
  return token;
};
