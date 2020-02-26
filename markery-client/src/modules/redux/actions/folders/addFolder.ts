import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { AddFolderResponse, AddFolderAction } from './types';
import { requestFormat } from '../requestFormat';

export const addFolder = (folderName: string, parentFolderId: string) => async (
  dispatch: Dispatch
) => {
  try {
    const response = await axios.post<AddFolderResponse>(
      '/api/folder',
      requestFormat({ folderName, parentFolderId })
    );

    // Update folders state
    dispatch<AddFolderAction>({
      type: ActionTypes.addFolder,
      payload: response.data.content
    });
  } catch (e) {
    console.error(e);
  }
};
