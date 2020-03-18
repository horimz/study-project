import { errorActionTypes } from './constants';
import { ErrorType } from './types';

export const setError = (type: ErrorType) => ({
  type: errorActionTypes.SET_ERROR,
  payload: type
});

export const resetError = () => ({ type: errorActionTypes.RESET_ERROR });

export const errorActions = {
  setError,
  resetError
};
