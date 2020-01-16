import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { User } from '../actions';

export interface StoreState {
  auth: User | boolean | null;
}

export const reducers = combineReducers<StoreState>({
  auth: authReducer
});
