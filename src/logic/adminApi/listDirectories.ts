import axios from 'axios';

import { requireTokenForUser } from '../token/requireTokenForUser';
import { findWhodisBadRequestErrorInAxiosError } from './WhodisBadRequestError';

export const listDirectories = async ({ namespace }: { namespace: string }): Promise<{ directories: string[] }> => {
  // grab their token
  const token = await requireTokenForUser();

  // list the directories
  try {
    const { data } = await axios.post('https://api.whodis.io/admin/directory/list', { namespace }, { headers: { authorization: `Bearer ${token}` } });
    return { directories: data.directories.map((directory: any) => directory.name) };
  } catch (error) {
    const whodisBadRequestError = findWhodisBadRequestErrorInAxiosError({ axiosError: error });
    if (whodisBadRequestError) throw whodisBadRequestError; // if we found its a whodisBadRequestError, throw it
    throw error; // otherwise, just pass the error up as is - there's nothing helpful we can add onto it
  }
};
