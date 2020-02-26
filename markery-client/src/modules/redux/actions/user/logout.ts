import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { FetchUserAction } from './types';
import { requestFormat } from '../requestFormat';

export const logout = () => async (dispatch: Dispatch) => {
  try {
    await axios.post('/api/logout', requestFormat({}));

    // Remove token from local storage
    localStorage.removeItem('authToken');

    // Set user state to false
    dispatch<FetchUserAction>({
      type: ActionTypes.fetchUser,
      payload: false
    });
  } catch (e) {}
};
