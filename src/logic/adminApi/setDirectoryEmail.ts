import axios, { AxiosError } from 'axios';

import { requireTokenForUser } from '../token/requireTokenForUser';
import { findWhodisBadRequestErrorInAxiosError } from './WhodisBadRequestError';

export const setDirectoryEmail = async ({
  directoryUuid,
  email,
}: {
  directoryUuid: string;
  email: string;
}): Promise<{ registration: any }> => {
  // grab their token
  const token = await requireTokenForUser();

  // reserve the namespace
  try {
    const { data } = await axios.post(
      'https://api.whodis.io/admin/directory/email/set',
      { directoryUuid, email },
      { headers: { authorization: `Bearer ${token}` } },
    );
    return { registration: data.registration };
  } catch (error) {
    const whodisBadRequestError = findWhodisBadRequestErrorInAxiosError({
      axiosError: error as AxiosError,
    });
    if (whodisBadRequestError) throw whodisBadRequestError; // if we found its a whodisBadRequestError, throw it
    throw error; // otherwise, just pass the error up as is - there's nothing helpful we can add onto it
  }
};
