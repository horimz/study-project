import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { IFolder, EditFolderAction, FetchFoldersAction } from './types';
import { requestFormat } from '../requestFormat';

export const editFolder = (
  updatedFolder: IFolder,
  prevFolders: IFolder[]
) => async (dispatch: Dispatch) => {
  dispatch<EditFolderAction>({
    type: ActionTypes.editFolder,
    payload: updatedFolder
  });

  try {
    await axios.patch('/api/folder', requestFormat(updatedFolder));
  } catch (e) {
    // Rollback folders status
    dispatch<FetchFoldersAction>({
      type: ActionTypes.fetchFolders,
      payload: prevFolders
    });
  }
};
