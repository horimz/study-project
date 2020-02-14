import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from './types';

export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserResponse {
  user: IUser;
  token: string;
}

export interface FetchUserAction {
  type: ActionTypes.fetchUser;
  payload: any; // TODO: fix typedef
}

export const login = (user: IUser) => async (dispatch: Dispatch) => {
  const response = await axios.post<IUserResponse>('/api/login', user);

  const { user: _user, token } = response.data;
  localStorage.setItem('authToken', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  dispatch<FetchUserAction>({
    type: ActionTypes.fetchUser,
    payload: _user
  });
};

export const logout = () => async (dispatch: Dispatch) => {
  const response = await axios.post('/api/logout');

  if (response.status === 200) {
    localStorage.removeItem('authToken');

    dispatch<FetchUserAction>({
      type: ActionTypes.fetchUser,
      payload: false
    });
  }
};

export const fetchUser = () => async (dispatch: Dispatch) => {
  const token = localStorage.getItem('authToken') || false;

  if (!token) {
    dispatch<FetchUserAction>({
      type: ActionTypes.fetchUser,
      payload: false
    });

    return;
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await axios.get<IUserResponse>('/api/user');

  const { user: _user } = response.data;

  console.log('current_user', _user);

  dispatch<FetchUserAction>({
    type: ActionTypes.fetchUser,
    payload: _user
  });
};

export const addUser = (user: IUser) => async (dispatch: Dispatch) => {
  const response = await axios.post<IUserResponse>('/api/user', user);

  const { user: _user, token } = response.data;

  localStorage.setItem('authToken', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  dispatch<FetchUserAction>({
    type: ActionTypes.fetchUser,
    payload: _user
  });
};

// TODO: update editUser, deleteUser, subscribe

export const editUser = (user: IUser) => async (dispatch: Dispatch) => {
  const response = await axios.patch<IUserResponse>('/api/user', user);

  dispatch<FetchUserAction>({
    type: ActionTypes.fetchUser,
    payload: response.data
  });
};

export const deleteUser = (uid: number) => async (dispatch: Dispatch) => {
  const response = await axios.delete<IUserResponse>(`/api/user/${uid}`);

  dispatch<FetchUserAction>({
    type: ActionTypes.fetchUser,
    payload: response.data
  });
};

export const subscribe = (
  subscribersId: number,
  subscribesTo: number
) => async (dispatch: Dispatch) => {
  const response = await axios.patch<IUserResponse>('/api/user');

  dispatch<FetchUserAction>({
    type: ActionTypes.fetchUser,
    payload: response.data
  });
};
