import axios from 'axios';

import { requireTokenForUser } from '../token/requireTokenForUser';
import { findWhodisBadRequestErrorInAxiosError } from './WhodisBadRequestError';

export const listNamespaces = async (): Promise<{ namespaces: string[] }> => {
  // grab their token
  const token = await requireTokenForUser();

  // list the namespaces
  try {
    const { data } = await axios.post('https://api.whodis.io/admin/namespace/list', {}, { headers: { authorization: `Bearer ${token}` } });
    return { namespaces: data.namespaces };
  } catch (error) {
    const whodisBadRequestError = findWhodisBadRequestErrorInAxiosError({ axiosError: error });
    if (whodisBadRequestError) throw whodisBadRequestError; // if we found its a whodisBadRequestError, throw it
    throw error; // otherwise, just pass the error up as is - there's nothing helpful we can add onto it
  }
};
