import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { FetchUserResponse, FetchUserAction } from './types';

export const fetchUser = () => async (dispatch: Dispatch) => {
  // Get token from local storage
  const token = localStorage.getItem('authToken') || false;

  // Set user state to false if no token was found
  if (!token) {
    dispatch<FetchUserAction>({
      type: ActionTypes.fetchUser,
      payload: false
    });

    return;
  }

  // Set token in header and fetch user credentials
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  try {
    const response = await axios.get<FetchUserResponse>('/api/user');
    const { content } = response.data;

    // Update user state
    dispatch<FetchUserAction>({
      type: ActionTypes.fetchUser,
      payload: content
    });
  } catch (e) {
    // Set user state to false
    dispatch<FetchUserAction>({
      type: ActionTypes.fetchUser,
      payload: false
    });
  }
};
