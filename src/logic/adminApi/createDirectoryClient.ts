import axios from 'axios';
import { v4 as uuid } from 'uuid';

import { requireTokenForUser } from '../token/requireTokenForUser';
import { findWhodisBadRequestErrorInAxiosError } from './WhodisBadRequestError';

export const createDirectoryClient = async ({
  directoryUuid,
  reason,
}: {
  directoryUuid: string;
  reason: string;
}): Promise<{ clientToken: string }> => {
  // grab their token
  const token = await requireTokenForUser();

  // generate a request uuid
  const requestUuid = uuid();

  // reserve the namespace
  try {
    const { data } = await axios.post(
      'https://api.whodis.io/admin/directory/client/create',
      { directoryUuid, reason, requestUuid },
      { headers: { authorization: `Bearer ${token}` } },
    );
    return { clientToken: data.clientToken };
  } catch (error) {
    const whodisBadRequestError = findWhodisBadRequestErrorInAxiosError({ axiosError: error });
    if (whodisBadRequestError) throw whodisBadRequestError; // if we found its a whodisBadRequestError, throw it
    throw error; // otherwise, just pass the error up as is - there's nothing helpful we can add onto it
  }
};
