import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { FetchFoldersResponse, FetchFoldersAction } from './types';

export const fetchFolders = (parentId: string) => async (
  dispatch: Dispatch
) => {
  try {
    const response = await axios.get<FetchFoldersResponse>(
      `/api/folders/${parentId}`
    );

    // Update folders state
    dispatch<FetchFoldersAction>({
      type: ActionTypes.fetchFolders,
      payload: response.data.content.folders
    });
  } catch (e) {
    console.error(e);
    // TODO: add state to show request failure
  }
};
