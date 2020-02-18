import { FetchUserAction } from './user';
import { FetchFolderContentsAction, FetchFoldersAction } from './folders';
import { FetchUrlsAction } from './urls';

export enum ActionTypes {
  fetchUser,
  fetchFolders,
  fetchFolderContents,
  fetchUrls
}

export type Action =
  | FetchUserAction
  | FetchFoldersAction
  | FetchFolderContentsAction
  | FetchUrlsAction;
