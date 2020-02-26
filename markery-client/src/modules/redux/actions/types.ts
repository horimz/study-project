import { FetchUserAction } from './user';
import {
  FetchRootFolderAction,
  FetchFoldersAction,
  AddFolderAction,
  EditFolderAction,
  DeleteFolderAction,
  ResetFoldersAction
} from './folders';
import {
  FetchUrlsAction,
  AddUrlAction,
  EditUrlAction,
  DeleteUrlAction,
  ResetUrlsAction
} from './urls';
import {
  AddFolderToSelectedFoldersAction,
  RemoveFolderFromSelectedFoldersAction,
  AddUrlToSelectedUrlsAction,
  RemoveUrlFromSelectedUrlsAction,
  ResetSelectedContents
} from './selectedContents';

export enum ActionTypes {
  // User action types
  fetchUser,
  // Folder action types
  fetchRootFolder,
  fetchFolders,
  addFolder,
  editFolder,
  deleteFolder,
  resetFolders,
  // Url action types
  fetchUrls,
  addUrl,
  editUrl,
  deleteUrl,
  resetUrls,
  // Selected content action types
  addFolderToSelectedFolders,
  removeFolderFromSelectedFolders,
  addUrlToSelectedUrls,
  removeUrlFromSelectedUrls,
  resetSelectedContents
}

export type Action =
  // User dispatch types
  | FetchUserAction
  // Folder dispatch types
  | FetchRootFolderAction
  | FetchFoldersAction
  | AddFolderAction
  | EditFolderAction
  | DeleteFolderAction
  | ResetFoldersAction
  // Url dispatch types
  | FetchUrlsAction
  | AddUrlAction
  | EditUrlAction
  | DeleteUrlAction
  | ResetUrlsAction
  // Selected content dispatch action types
  | AddFolderToSelectedFoldersAction
  | RemoveFolderFromSelectedFoldersAction
  | AddUrlToSelectedUrlsAction
  | RemoveUrlFromSelectedUrlsAction
  | ResetSelectedContents;
