import { Dispatch } from 'redux';
import { ActionTypes } from '../types';
import { ResetUrlsAction } from './types';

export const resetUrls = () => async (dispatch: Dispatch) => {
  // Reset urls state
  dispatch<ResetUrlsAction>({
    type: ActionTypes.resetUrls,
    payload: null
  });
};
