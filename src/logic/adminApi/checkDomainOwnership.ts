import axios from 'axios';

import { requireTokenForUser } from '../token/requireTokenForUser';
import { findWhodisBadRequestErrorInAxiosError } from './WhodisBadRequestError';

export const checkDomainOwnership = async ({ domain }: { domain: string }): Promise<{ ownership: any }> => {
  // grab their token
  const token = await requireTokenForUser();

  // make the request, with badRequestError handling
  try {
    const { data } = await axios.post(
      'https://api.whodis.io/admin/domain/ownership/check',
      { domain },
      { headers: { authorization: `Bearer ${token}` } },
    );
    return { ownership: data.ownership };
  } catch (error) {
    const whodisBadRequestError = findWhodisBadRequestErrorInAxiosError({ axiosError: error });
    if (whodisBadRequestError) throw whodisBadRequestError; // if we found its a whodisBadRequestError, throw it
    throw error; // otherwise, just pass the error up as is - there's nothing helpful we can add onto it
  }
};
