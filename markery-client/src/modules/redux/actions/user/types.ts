import { ActionTypes } from '../types';

/* User type */

export interface IUser {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
}

/* Response types */

export interface FetchUserResponse {
  transactionTime: Date;
  content: IUser;
}

export interface AddUserResponse {
  transactionTime: Date;
  content: { user: IUser; token: string };
}

export interface LoginResponse {
  transactionTime: Date;
  content: { user: IUser; token: string };
}

/* Auth dispatch types */

export interface FetchUserAction {
  type: ActionTypes.fetchUser;
  payload: IUser | boolean;
}
