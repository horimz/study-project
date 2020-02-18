import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { foldersReducer } from './folders';
import { urlsReducer } from './urls';
import { contentsReducer } from './contents';
import { IFolder, IFolderContents, IUrl } from '../actions';

export interface StoreState {
  auth: any;
  folders: IFolder[] | null;
  urls: IUrl[] | null;
  contents: IFolderContents | null;
}

export const reducers = combineReducers<StoreState>({
  auth: authReducer,
  folders: foldersReducer,
  urls: urlsReducer,
  contents: contentsReducer
});
