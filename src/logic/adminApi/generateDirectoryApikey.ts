import axios from 'axios';

import { requireTokenForUser } from '../token/requireTokenForUser';
import { findWhodisBadRequestErrorInAxiosError } from './WhodisBadRequestError';

export const generateDirectoryApikey = async ({
  directoryUuid,
}: {
  directoryUuid: string;
}): Promise<{ clientPublicKey: string; clientPrivateKey: string }> => {
  // grab their token
  const token = await requireTokenForUser();

  // reserve the namespace
  try {
    const { data } = await axios.post(
      'https://api.whodis.io/admin/apikey/generate',
      { directoryUuid },
      { headers: { authorization: `Bearer ${token}` } },
    );
    return { clientPublicKey: data.clientPublicKey, clientPrivateKey: data.clientPrivateKey };
  } catch (error) {
    const whodisBadRequestError = findWhodisBadRequestErrorInAxiosError({ axiosError: error });
    if (whodisBadRequestError) throw whodisBadRequestError; // if we found its a whodisBadRequestError, throw it
    throw error; // otherwise, just pass the error up as is - there's nothing helpful we can add onto it
  }
};
