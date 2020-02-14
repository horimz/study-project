import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { foldersReducer } from './folders';
import { urlsReducer } from './urls';
import { Folders, Urls } from '../actions';

export interface StoreState {
  auth: any;
  folders: Folders | null;
  urls: Urls | null;
}

export const reducers = combineReducers<StoreState>({
  auth: authReducer,
  folders: foldersReducer,
  urls: urlsReducer
});
