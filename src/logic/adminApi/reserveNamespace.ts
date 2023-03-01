import axios, { AxiosError } from 'axios';

import { requireTokenForUser } from '../token/requireTokenForUser';
import { findWhodisBadRequestErrorInAxiosError } from './WhodisBadRequestError';

export const reserveNamespace = async ({
  namespace,
}: {
  namespace: string;
}): Promise<{ success: true }> => {
  // grab their token
  const token = await requireTokenForUser();

  // reserve the namespace
  try {
    const { data } = await axios.post(
      'https://api.whodis.io/admin/namespace/reserve',
      { namespace },
      { headers: { authorization: `Bearer ${token}` } },
    );
    return { success: data.success };
  } catch (error) {
    const whodisBadRequestError = findWhodisBadRequestErrorInAxiosError({
      axiosError: error as AxiosError,
    });
    if (whodisBadRequestError) throw whodisBadRequestError; // if we found its a whodisBadRequestError, throw it
    throw error; // otherwise, just pass the error up as is - there's nothing helpful we can add onto it
  }
};
