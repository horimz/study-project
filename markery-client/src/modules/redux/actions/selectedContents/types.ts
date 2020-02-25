import { ActionTypes } from '../types';

export interface AddFolderToSelectedFoldersAction {
  type: ActionTypes.addFolderToSelectedFolders;
  payload: string; // Folder id
}

export interface RemoveFolderFromSelectedFoldersAction {
  type: ActionTypes.removeFolderFromSelectedFolders;
  payload: string; // Folder id
}

export interface AddUrlToSelectedUrlsAction {
  type: ActionTypes.addUrlToSelectedUrls;
  payload: string; // Url id
}

export interface RemoveUrlFromSelectedUrlsAction {
  type: ActionTypes.removeUrlFromSelectedUrls;
  payload: string; // Url id
}

export interface ResetSelectedContents {
  type: ActionTypes.resetSelectedContents;
  payload: null;
}
