import { FetchUserAction } from './user';
import { FetchFolderAction, FetchFoldersAction } from './folders';
import { FetchUrlsAction } from './urls';

export enum ActionTypes {
  fetchUser,
  fetchFolders,
  fetchFolder,
  fetchUrls
}

export type Action =
  | FetchUserAction
  | FetchFolderAction
  | FetchFoldersAction
  | FetchUrlsAction;
