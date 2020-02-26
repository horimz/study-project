import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { IUser, FetchUserAction } from './types';
import { requestFormat } from '../requestFormat';

export const editUser = (currentuser: IUser, updatedUser: IUser) => async (
  dispatch: Dispatch
) => {
  // Update user state
  dispatch<FetchUserAction>({
    type: ActionTypes.fetchUser,
    payload: updatedUser
  });

  try {
    await axios.patch('api/user', requestFormat(updatedUser));
  } catch (e) {
    // Rollback user state
    dispatch<FetchUserAction>({
      type: ActionTypes.fetchUser,
      payload: currentuser
    });
  }
};
