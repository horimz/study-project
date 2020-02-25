import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { IUser, AddUserResponse, FetchUserAction } from './types';
import { requestFormat } from '../requestFormat';

export const addUser = (newUser: IUser) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post<AddUserResponse>(
      '/api/user',
      requestFormat(newUser)
    );

    const {
      // transactionTime,
      content: { user, token }
    } = response.data;

    // Set token in local storage
    localStorage.setItem('authToken', token);

    // Set token in request header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Update user state
    dispatch<FetchUserAction>({
      type: ActionTypes.fetchUser,
      payload: user
    });
  } catch (e) {}
};
