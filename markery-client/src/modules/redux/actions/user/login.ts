import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { IUser, LoginResponse, FetchUserAction } from './types';
import { requestFormat } from '../requestFormat';

export const login = (userCredentials: IUser) => async (dispatch: Dispatch) => {
  try {
    const response = await axios.post<LoginResponse>(
      '/api/login',
      requestFormat(userCredentials)
    );

    const {
      // transactionTime,
      content: { user, token }
    } = response.data;

    // Set token in local storage
    localStorage.setItem('authToken', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Update user state
    dispatch<FetchUserAction>({
      type: ActionTypes.fetchUser,
      payload: user
    });
  } catch (e) {
    // Set user state to false
    dispatch<FetchUserAction>({
      type: ActionTypes.fetchUser,
      payload: false
    });
  }
};
