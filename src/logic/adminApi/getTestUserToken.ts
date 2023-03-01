import axios, { AxiosError } from 'axios';

import { requireTokenForUser } from '../token/requireTokenForUser';
import { findWhodisBadRequestErrorInAxiosError } from './WhodisBadRequestError';

export const getTestUserToken = async ({
  directoryUuid,
  audienceUri,
  expirationInHours,
}: {
  directoryUuid: string;
  audienceUri: string;
  expirationInHours: { forAuth: string; forRefresh: string };
}): Promise<{ token: string }> => {
  // grab their token
  const token = await requireTokenForUser();

  // reserve the namespace
  try {
    const { data } = await axios.post(
      'https://api.whodis.io/admin/directory/test-user/generate-token',
      { directoryUuid, audienceUri, expirationInHours },
      { headers: { authorization: `Bearer ${token}` } },
    );
    return { token: data.token };
  } catch (error) {
    const whodisBadRequestError = findWhodisBadRequestErrorInAxiosError({
      axiosError: error as AxiosError,
    });
    if (whodisBadRequestError) throw whodisBadRequestError; // if we found its a whodisBadRequestError, throw it
    throw error; // otherwise, just pass the error up as is - there's nothing helpful we can add onto it
  }
};
