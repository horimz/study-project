import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { FetchUrlsResponse, FetchUrlsAction } from './types';

export const fetchUrls = (parentFolderId: string) => async (
  dispatch: Dispatch
) => {
  try {
    const response = await axios.get<FetchUrlsResponse>(
      `/api/urls/${parentFolderId}`
    );

    // Update urls state
    dispatch<FetchUrlsAction>({
      type: ActionTypes.fetchUrls,
      payload: response.data.content.urls
    });
  } catch (e) {
    console.error(e);
    // TODO: add state to show request failure
  }
};
