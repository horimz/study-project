import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { ResetFoldersAction } from './types';

export const resetFolders = () => async (dispatch: Dispatch) => {
  // Reset folders state
  dispatch<ResetFoldersAction>({
    type: ActionTypes.resetFolders,
    payload: null
  });
};
