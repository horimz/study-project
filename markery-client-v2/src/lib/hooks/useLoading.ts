import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../modules";
import { LoadingState } from "../../modules/reducers/loading";
import { loadingActions, LoadingType } from "../../modules/actions/loading";

export const useLoading = () => {
  const loading: LoadingState = useSelector(
    (state: RootState) => state.loading
  );

  const dispatch = useDispatch();

  const startLoading = useCallback(
    (type: LoadingType) => dispatch(loadingActions.startLoading(type)),
    [dispatch]
  );

  const finishLoading = useCallback(
    () => dispatch(loadingActions.finishLoading()),
    [dispatch]
  );

  return {
    loading,
    startLoading,
    finishLoading,
    LoadingType
  };
};
