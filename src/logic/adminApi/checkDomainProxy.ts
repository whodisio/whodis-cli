import axios from 'axios';

import { requireTokenForUser } from '../token/requireTokenForUser';
import { findWhodisBadRequestErrorInAxiosError } from './WhodisBadRequestError';

export const checkDomainProxy = async ({ domain }: { domain: string }): Promise<{ proxy: any }> => {
  // grab their token
  const token = await requireTokenForUser();

  // make the request, with badRequestError handling
  try {
    const { data } = await axios.post(
      'https://api.whodis.io/admin/domain/proxy/check',
      { domain },
      { headers: { authorization: `Bearer ${token}` } },
    );
    return { proxy: data.proxy };
  } catch (error) {
    const whodisBadRequestError = findWhodisBadRequestErrorInAxiosError({ axiosError: error });
    if (whodisBadRequestError) throw whodisBadRequestError; // if we found its a whodisBadRequestError, throw it
    throw error; // otherwise, just pass the error up as is - there's nothing helpful we can add onto it
  }
};
