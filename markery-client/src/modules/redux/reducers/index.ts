import { combineReducers } from 'redux';
import { IUser, IFolder, IUrl } from '../actions';
import { authReducer } from './authReducer';
import { foldersReducer } from './foldersReducer';
import { urlsReducer } from './urlsReducer';
import { rootFolderReducer } from './rootFolderReducer';
import { selectedFoldersReducer } from './selectedFoldersReducer';
import { selectedurlsReducer } from './selectedUrlsReducer';

export interface StoreState {
  auth: IUser | boolean | null;
  folders: IFolder[] | null;
  urls: IUrl[] | null;
  rootFolderId: string | null;
  selectedFolders: string[]; // Ids
  selectedUrls: string[]; // Ids
}

export const rootReducer = combineReducers<StoreState>({
  auth: authReducer,
  folders: foldersReducer,
  urls: urlsReducer,
  rootFolderId: rootFolderReducer,
  selectedFolders: selectedFoldersReducer,
  selectedUrls: selectedurlsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
