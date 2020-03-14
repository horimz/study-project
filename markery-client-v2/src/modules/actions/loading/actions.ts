import { loadingActionTypes } from "./constants";
import { LoadingType } from "./type";

export const startLoading = (type: LoadingType) => ({
  type: loadingActionTypes.START_LOADING,
  payload: type
});

export const finishLoading = () => ({
  type: loadingActionTypes.FINISH_LOADING
});

export const loadingActions = {
  startLoading,
  finishLoading
};
