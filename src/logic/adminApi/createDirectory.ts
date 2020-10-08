import axios from 'axios';

import { requireTokenForUser } from '../token/requireTokenForUser';
import { findWhodisBadRequestErrorInAxiosError } from './WhodisBadRequestError';

export const createDirectory = async ({ namespace, name }: { namespace: string; name: string }): Promise<{ directoryUuid: string }> => {
  // grab their token
  const token = await requireTokenForUser();

  // reserve the namespace
  try {
    const { data } = await axios.post(
      'https://api.whodis.io/admin/directory/create',
      { directory: { namespace, name } },
      { headers: { authorization: `Bearer ${token}` } },
    );
    return { directoryUuid: data.directoryUuid };
  } catch (error) {
    const whodisBadRequestError = findWhodisBadRequestErrorInAxiosError({ axiosError: error });
    if (whodisBadRequestError) throw whodisBadRequestError; // if we found its a whodisBadRequestError, throw it
    throw error; // otherwise, just pass the error up as is - there's nothing helpful we can add onto it
  }
};
