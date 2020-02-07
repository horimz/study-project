import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface User {
  uid: string;
  displayName: string;
  email: number;
  photoUrl?: string;
}

export interface FetchUserAction {
  type: ActionTypes.fetchUser;
  payload: User | false;
}

export const fetchUser = () => async (dispatch: Dispatch) => {
  const response = await axios.get<User>('/user');

  dispatch<FetchUserAction>({
    type: ActionTypes.fetchUser,
    payload: response.data
  });
};

export const addUser = (user: User) => async (dispatch: Dispatch) => {
  const response = await axios.post<User>('/user', user);

  dispatch<FetchUserAction>({
    type: ActionTypes.fetchUser,
    payload: response.data
  });
};

export const editUser = (user: User) => async (dispatch: Dispatch) => {
  const response = await axios.patch<User>('/user');

  dispatch<FetchUserAction>({
    type: ActionTypes.fetchUser,
    payload: response.data
  });
};

export const deleteUser = (id: number) => async (dispatch: Dispatch) => {
  const response = await axios.delete<User>('/user');

  dispatch<FetchUserAction>({
    type: ActionTypes.fetchUser,
    payload: response.data
  });
};

export const subscribe = (
  subscribersId: number,
  subscribesTo: number
) => async (dispatch: Dispatch) => {
  const response = await axios.patch<User>('/user');

  dispatch<FetchUserAction>({
    type: ActionTypes.fetchUser,
    payload: response.data
  });
};
