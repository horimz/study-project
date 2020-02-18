import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { IUrl } from './urls';

export interface IFolder {
  _id?: string;
  folderName: string;
  owner?: string;
}

export interface IFolderContents {
  folders: IFolder[];
  urls: IUrl[];
}

export interface FetchFoldersAction {
  type: ActionTypes.fetchFolders;
  payload: IFolder[];
}

export interface FetchFolderContentsAction {
  type: ActionTypes.fetchFolderContents;
  payload: IFolderContents | null;
}

export const fetchFolderContent = (folderId: string) => async (
  dispatch: Dispatch
) => {
  dispatch<FetchFolderContentsAction>({
    type: ActionTypes.fetchFolderContents,
    payload: null
  });

  const response = await axios.get<IFolderContents>(`/api/folder/${folderId}`);

  dispatch<FetchFolderContentsAction>({
    type: ActionTypes.fetchFolderContents,
    payload: response.data
  });
};

export const fetchFolders = () => async (dispatch: Dispatch) => {
  const response = await axios.get<IFolder[]>('/api/folders');

  dispatch<FetchFoldersAction>({
    type: ActionTypes.fetchFolders,
    payload: response.data
  });
};

export const addFolder = (folderName: string) => async (dispatch: Dispatch) => {
  const folder = { folderName };

  const response = await axios.post<IFolder[]>('/api/folder', folder);

  dispatch<FetchFoldersAction>({
    type: ActionTypes.fetchFolders,
    payload: response.data
  });
};

export const addSubFolder = (folderName: string, folderId: string) => async (
  dispatch: Dispatch
) => {
  dispatch<FetchFolderContentsAction>({
    type: ActionTypes.fetchFolderContents,
    payload: null
  });

  const folder = { folderName };

  const response = await axios.post<IFolderContents>(
    `/api/folder/${folderId}`,
    folder
  );

  dispatch<FetchFolderContentsAction>({
    type: ActionTypes.fetchFolderContents,
    payload: response.data
  });
};

export const editFolder = (folder: {
  folderName: string;
  folderId: string;
}) => async (dispatch: Dispatch) => {
  const _folder = {
    folderName: folder.folderName
  };

  const response = await axios.patch<IFolder[]>(
    `/api/folder/${folder.folderId}`,
    _folder
  );

  dispatch<FetchFoldersAction>({
    type: ActionTypes.fetchFolders,
    payload: response.data
  });
};

export const deleteFolder = (id: string) => async (dispatch: Dispatch) => {
  const response = await axios.delete<IFolder[]>(`/api/folder/${id}`);

  dispatch<FetchFoldersAction>({
    type: ActionTypes.fetchFolders,
    payload: response.data
  });
};

// update content after update and delete
export const updateContent = (updatedContents: IFolderContents) => (
  dispatch: Dispatch
) => {
  dispatch<FetchFolderContentsAction>({
    type: ActionTypes.fetchFolderContents,
    payload: updatedContents
  });
};
