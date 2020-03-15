import {
  errorActionTypes,
  ErrorState,
  ErrorType,
  ErrorAction
} from '../actions/error';
import produce from 'immer';

const initialState: ErrorState = {
  hasError: false,
  type: ErrorType.none
};

export function errorReducer(
  state: ErrorState = initialState,
  action: ErrorAction
) {
  switch (action.type) {
    case errorActionTypes.SET_ERROR:
      return produce(state, draft => {
        draft.hasError = true;
        draft.type = action.payload;
      });
    case errorActionTypes.RESET_ERROR:
      return produce(state, draft => {
        draft.hasError = false;
        draft.type = ErrorType.none;
      });
    default:
      return state;
  }
}
