import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { FetchRootFolderResponse, FetchRootFolderAction } from './types';

export const fetchRootFolder = (userId: string) => async (
  dispatch: Dispatch
) => {
  try {
    const response = await axios.get<FetchRootFolderResponse>(
      `/api/folder/${userId}`
    );

    const {
      // transactionTime,
      content: { rootFolderId }
    } = response.data;

    // Update root folder state
    dispatch<FetchRootFolderAction>({
      type: ActionTypes.fetchRootFolder,
      payload: rootFolderId
    });
  } catch (e) {
    console.error(e);
  }
};
