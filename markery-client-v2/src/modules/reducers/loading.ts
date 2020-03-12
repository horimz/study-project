import { loadingActionTypes, LoadingType } from "../actions/loading";

export interface LoadingState {
  isLoading: boolean;
  type: LoadingType;
}

// TODO: any way for typesafe actions?
export interface LoadingAction {
  type: string;
  payload?: any;
}

const initialState: LoadingState = {
  isLoading: false,
  type: LoadingType.none
};

export function loadingReducer(
  state: LoadingState = initialState,
  action: LoadingAction
) {
  switch (action.type) {
    case loadingActionTypes.START_LOADING: {
      return { isLoading: true, type: action.payload };
    }
    case loadingActionTypes.FINISH_LOADING: {
      return { isLoading: false, type: LoadingType.none };
    }
    default:
      return state;
  }
}
