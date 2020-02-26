import { ActionTypes } from '../types';

/* Folder type */

export interface IFolder {
  _id?: string;
  folderName: string;
  owner?: string;
  createdAt?: Date;
}

/* Response types */

export interface FetchRootFolderResponse {
  transactionTime: Date;
  content: {
    rootFolderId: string;
  };
}

export interface FetchFoldersResponse {
  transactionTime: Date;
  content: {
    folders: IFolder[];
  };
}

export interface AddFolderResponse {
  transactionTime: Date;
  content: {
    _id: string;
    folderName: string;
  };
}

/* Dispatch action types */

export interface FetchRootFolderAction {
  type: ActionTypes.fetchRootFolder;
  payload: string;
}

export interface FetchFoldersAction {
  type: ActionTypes.fetchFolders;
  payload: IFolder[];
}

export interface AddFolderAction {
  type: ActionTypes.addFolder;
  payload: IFolder;
}

export interface EditFolderAction {
  type: ActionTypes.editFolder;
  payload: IFolder;
}

export interface DeleteFolderAction {
  type: ActionTypes.deleteFolder;
  payload: string; // Folder id
}

export interface ResetFoldersAction {
  type: ActionTypes.resetFolders;
  payload: null;
}
