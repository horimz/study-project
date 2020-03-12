import { authActionTypes } from "../actions/auth/constants";
import { User } from "../../lib/api/auth/types";
import produce from "immer";

export interface AuthState {
  user: User | null;
}

// TODO: any way for typesafe actions?
export interface AuthAction {
  type: string;
  payload?: any;
}

const initialState: AuthState = {
  user: null
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthAction
) {
  switch (action.type) {
    case authActionTypes.SET_USER: {
      return produce(state, draft => {
        draft.user = action.payload;
      });
    }
    case authActionTypes.FETCH_USER_SUCCESS: {
      return produce(state, draft => {
        draft.user = action.payload;
      });
    }
    case authActionTypes.FETCH_USER_FAILURE: {
      return produce(state, draft => {
        draft.user = null;
      });
    }
    case authActionTypes.LOGIN_SUCCESS: {
      return produce(state, draft => {
        draft.user = action.payload;
      });
    }
    case authActionTypes.LOGIN_FAILURE: {
      return produce(state, draft => {
        draft.user = null;
      });
    }
    case authActionTypes.REGISTER_SUCCESS: {
      return produce(state, draft => {
        draft.user = action.payload;
      });
    }
    case authActionTypes.REGISTER_FAILURE: {
      return produce(state, draft => {
        draft.user = null;
      });
    }
    case authActionTypes.LOGOUT_SUCCESS: {
      return produce(state, draft => {
        draft.user = null;
      });
    }
    case authActionTypes.LOGOUT_FAILURE: {
      return produce(state, draft => {
        draft.user = null;
      });
    }
    case authActionTypes.UPDATE_USER_SUCCESS: {
      return produce(state, draft => {
        draft.user = action.payload;
      });
    }
    case authActionTypes.UPDATE_USER_FAILURE: {
      return produce(state, draft => {
        draft.user = null;
      });
    }
    case authActionTypes.DELETE_USER_SUCCESS: {
      return produce(state, draft => {
        draft.user = null;
      });
    }
    case authActionTypes.DELETE_USER_FAILURE: {
      return state;
    }
    default:
      return state;
  }
}
