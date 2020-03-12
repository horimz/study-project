import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../modules";
import { AuthState } from "../../modules/reducers/auth";
import { authActions } from "../../modules/actions/auth";
import * as authTypes from "../api/auth/types";

export const useAuth = () => {
  const auth: AuthState = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  const fetchUserRequest = useCallback(
    () => dispatch(authActions.fetchUserRequest()),
    [dispatch]
  );

  const loginRequest = useCallback(
    (data: authTypes.LoginInput) => dispatch(authActions.loginRequest(data)),
    [dispatch]
  );

  const logoutRequest = useCallback(
    () => dispatch(authActions.logoutRequest()),
    [dispatch]
  );

  const registerRequest = useCallback(
    (data: authTypes.RegisterInput) =>
      dispatch(authActions.registerRequest(data)),
    [dispatch]
  );

  const updateUserRequest = useCallback(
    (data: authTypes.UpdateUserInput) =>
      dispatch(authActions.updateUserRequest(data)),
    [dispatch]
  );

  const deleteUserRequest = useCallback(
    () => dispatch(authActions.deleteUserRequest()),
    [dispatch]
  );

  return {
    auth,
    loginRequest,
    logoutRequest,
    fetchUserRequest,
    registerRequest,
    updateUserRequest,
    deleteUserRequest
  };
};
