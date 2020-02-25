import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import {
  AddFolderToSelectedFoldersAction,
  RemoveFolderFromSelectedFoldersAction,
  AddUrlToSelectedUrlsAction,
  RemoveUrlFromSelectedUrlsAction,
  ResetSelectedContents
} from './types';

export const addFolderToSelectedFolders = (id: string) => (
  dispatch: Dispatch
) => {
  dispatch<AddFolderToSelectedFoldersAction>({
    type: ActionTypes.addFolderToSelectedFolders,
    payload: id
  });
};

export const removeFolderFromSelectedFolders = (id: string) => (
  dispatch: Dispatch
) => {
  dispatch<RemoveFolderFromSelectedFoldersAction>({
    type: ActionTypes.removeFolderFromSelectedFolders,
    payload: id
  });
};

export const addUrlToSelectedUrls = (id: string) => (dispatch: Dispatch) => {
  dispatch<AddUrlToSelectedUrlsAction>({
    type: ActionTypes.addUrlToSelectedUrls,
    payload: id
  });
};

export const removeUrlFromSelectedUrls = (id: string) => (
  dispatch: Dispatch
) => {
  dispatch<RemoveUrlFromSelectedUrlsAction>({
    type: ActionTypes.removeUrlFromSelectedUrls,
    payload: id
  });
};

export const resetSelectedContents = () => (dispatch: Dispatch) => {
  dispatch<ResetSelectedContents>({
    type: ActionTypes.resetSelectedContents,
    payload: null
  });
};
