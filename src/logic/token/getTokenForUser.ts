import fs from 'fs';
import os from 'os';
import { isTokenExpired, isTokenRefreshable, refreshToken } from 'whodis-client';

/**
 * find token from storage
 *
 * if token is expired, check if we can refresh it
 *
 * if cant refresh it, return null
 */
export const getTokenForUser = async (): Promise<string | null> => {
  // check if token exists
  const homeDir = os.homedir();
  const pathToToken = `${homeDir}/.whodis/.token`;
  const tokenExists = fs.existsSync(pathToToken);
  if (!tokenExists) return null;

  // grab the token
  const token: string | null = await (async () => {
    try {
      const contents = JSON.parse(fs.readFileSync(pathToToken).toString());
      if (contents.token === '') return null;
      if (contents.token) return contents.token;
      return null; // corrupt contents
    } catch (error) {
      return null; // json parsing error, corrupt token
    }
  })();
  if (!token) return null;

  // check if its expired and refreshable
  if (!isTokenExpired({ token })) return token; // not expired? we're good to go
  if (isTokenRefreshable({ token })) return (await refreshToken({ token })).token; // expired and refreshable? good to go
  return null; // expired and not refreshable? out of luck
};
