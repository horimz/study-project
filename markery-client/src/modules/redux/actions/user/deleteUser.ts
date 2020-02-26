import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { FetchUserAction } from './types';

export const deleteUser = () => async (dispatch: Dispatch) => {
  try {
    await axios.delete('api/user');

    // Remove token from local storage
    localStorage.removeItem('authToken');

    // Set user state to false
    dispatch<FetchUserAction>({
      type: ActionTypes.fetchUser,
      payload: false
    });
  } catch (e) {}
};
