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
  payload: User;
}

export const fetchUser = () => {
  return async (dispatch: Dispatch) => {
    const response = await axios.get<User>('/api/current_user');

    dispatch<FetchUserAction>({
      type: ActionTypes.fetchUser,
      payload: response.data
    });
  };
};
