import {
  loadingActionTypes,
  LoadingType,
  LoadingState,
  LoadingAction
} from "../actions/loading";

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
