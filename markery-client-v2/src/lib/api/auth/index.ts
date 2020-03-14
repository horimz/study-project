import { apiClient } from "../apiClient";
import { formatRequest } from "../formatRequest";
import * as authTypes from "./types";

const prefix = "/api";

// Auth api
export const login = (data: authTypes.LoginInput) =>
  apiClient.post<authTypes.LoginResponse>(
    `${prefix}/auth/login`,
    formatRequest(data)
  );

export const logout = () =>
  apiClient.post<authTypes.LogoutResponse>(
    `${prefix}/auth/logout`,
    formatRequest({})
  );

export const fetchUser = () =>
  apiClient.get<authTypes.FetchUserResponse>(`${prefix}/users`);

export const register = (data: authTypes.RegisterInput) =>
  apiClient.post<authTypes.RegisterResponse>(
    `${prefix}/users`,
    formatRequest(data)
  );

export const updateUser = (data: authTypes.UpdateUserInput) =>
  apiClient.patch<authTypes.UpdateUserResponse>(
    `${prefix}/users`,
    formatRequest(data)
  );

export const deleteUser = () =>
  apiClient.delete<authTypes.DeleteUserResponse>(`${prefix}/users`);
