import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { IUrl, EditUrlAction, FetchUrlsAction } from './types';
import { requestFormat } from '../requestFormat';

export const editUrl = (updatedUrl: IUrl, prevUrls: IUrl[]) => async (
  dispatch: Dispatch
) => {
  // Update urls state
  dispatch<EditUrlAction>({
    type: ActionTypes.editUrl,
    payload: updatedUrl
  });

  try {
    await axios.patch('/api/url', requestFormat(updatedUrl));
  } catch (e) {
    // Rollback urls status
    dispatch<FetchUrlsAction>({
      type: ActionTypes.fetchUrls,
      payload: prevUrls
    });
  }
};
