import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { IFolder, DeleteFolderAction, FetchFoldersAction } from './types';

export const deleteFolder = (id: string, prevFolders: IFolder[]) => async (
  dispatch: Dispatch
) => {
  dispatch<DeleteFolderAction>({
    type: ActionTypes.deleteFolder,
    payload: id
  });

  try {
    await axios.delete(`/api/folder/${id}`);
  } catch (e) {
    // Rollback folders status
    dispatch<FetchFoldersAction>({
      type: ActionTypes.fetchFolders,
      payload: prevFolders
    });
  }
};
