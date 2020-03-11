import { apiClient } from "./apiClient";

export type LoginInput = {
  email: string;
  password: string;
};

export interface RegisterInput extends LoginInput {
  username: string;
}

const login = (data: LoginInput) => apiClient.post("/api/auth/login", data);
const register = (data: RegisterInput) =>
  apiClient.post("/api/auth/register", data);

export { login, register };
