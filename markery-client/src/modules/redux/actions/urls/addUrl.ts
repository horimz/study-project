import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { IUrl, AddUrlResponse, AddUrlAction } from './types';
import { requestFormat } from '../requestFormat';

export const addUrl = (url: IUrl, parentFolderId: string) => async (
  dispatch: Dispatch
) => {
  try {
    const response = await axios.post<AddUrlResponse>(
      '/api/url',
      requestFormat({ ...url, parentFolderId })
    );

    // Update urls state
    dispatch<AddUrlAction>({
      type: ActionTypes.addUrl,
      payload: response.data.content
    });
  } catch (e) {
    console.error(e);
  }
};
