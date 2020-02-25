import { FetchUserAction } from './user';
import {
  FetchRootFolderAction,
  FetchFoldersAction,
  AddFolderAction,
  EditFolderAction,
  DeleteFolderAction
} from './folders';
import {
  FetchUrlsAction,
  AddUrlAction,
  EditUrlAction,
  DeleteUrlAction
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
  // Url action types
  fetchUrls,
  addUrl,
  editUrl,
  deleteUrl,
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
  // Url dispatch types
  | FetchUrlsAction
  | AddUrlAction
  | EditUrlAction
  | DeleteUrlAction
  // Selected content dispatch action types
  | AddFolderToSelectedFoldersAction
  | RemoveFolderFromSelectedFoldersAction
  | AddUrlToSelectedUrlsAction
  | RemoveUrlFromSelectedUrlsAction
  | ResetSelectedContents;
