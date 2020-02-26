import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { DeleteUrlAction, IUrl, FetchUrlsAction } from './types';

export const deleteUrl = (id: string, prevUrls: IUrl[]) => async (
  dispatch: Dispatch
) => {
  dispatch<DeleteUrlAction>({
    type: ActionTypes.deleteUrl,
    payload: id
  });

  try {
    await axios.delete(`/api/url/${id}`);
  } catch (e) {
    // Rollback urls status
    dispatch<FetchUrlsAction>({
      type: ActionTypes.fetchUrls,
      payload: prevUrls
    });
  }
};
