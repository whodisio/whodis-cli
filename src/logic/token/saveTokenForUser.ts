import fs from 'fs';
import os from 'os';

export const saveTokenForUser = async ({ token }: { token: string }) => {
  const homeDir = os.homedir();
  const whodisDir = `${homeDir}/.whodis`;
  if (!fs.existsSync(whodisDir)) fs.mkdirSync(whodisDir);
  fs.writeFileSync(`${whodisDir}/.token`, JSON.stringify({ token }));
};
