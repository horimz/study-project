import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface Folder {
  id: string;
  name: string;
}

export interface Folders {
  folders: Folder[];
}

export interface FetchFolderAction {
  type: ActionTypes.fetchFolder;
  payload: Folder;
}

export interface FetchFoldersAction {
  type: ActionTypes.fetchFolders;
  payload: Folders;
}

export const fetchFolder = (id: number) => async (dispatch: Dispatch) => {
  const response = await axios.get<Folder>('/folder');

  dispatch<FetchFolderAction>({
    type: ActionTypes.fetchFolder,
    payload: response.data
  });
};

export const fetchFolders = () => async (dispatch: Dispatch) => {
  const response = await axios.get<Folders>('/folders');

  dispatch<FetchFoldersAction>({
    type: ActionTypes.fetchFolders,
    payload: response.data
  });
};

export const addFolder = (folder: Folder) => async (dispatch: Dispatch) => {
  const response = await axios.post<Folders>('/folders');

  dispatch<FetchFoldersAction>({
    type: ActionTypes.fetchFolders,
    payload: response.data
  });
};

export const editFolder = (folder: Folder) => async (dispatch: Dispatch) => {
  const response = await axios.patch<Folders>('/folders');

  dispatch<FetchFoldersAction>({
    type: ActionTypes.fetchFolders,
    payload: response.data
  });
};

export const deleteFolder = (id: number) => async (dispatch: Dispatch) => {
  const response = await axios.delete<Folders>('/folders');

  dispatch<FetchFoldersAction>({
    type: ActionTypes.fetchFolders,
    payload: response.data
  });
};
