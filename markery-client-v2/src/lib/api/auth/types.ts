import { AxiosResponse } from "axios";

// User type
export interface User {
  _id?: string;
  username: string;
  email?: string;
  description?: string;
  password?: string;
  emailVerified?: boolean;
}

// Input types
export type LoginInput = {
  email: string;
  password: string;
};

export interface RegisterInput {
  email: string;
  password: string;
  username: string;
}

export interface UpdateUserInput {
  username?: string;
  description?: string;
}

// Response types
export interface LoginResponse extends AxiosResponse {
  transactionTime: Date;
  content: {
    user: User;
    token: string;
  };
}

export interface LogoutResponse extends AxiosResponse {
  transactionTime: Date;
  content: User;
}

export interface FetchUserResponse extends AxiosResponse {
  transactionTime: Date;
  content: User;
}

export interface RegisterResponse extends AxiosResponse {
  transactionTime: Date;
  content: {
    user: User;
    token: string;
  };
}

export interface UpdateUserResponse extends AxiosResponse {
  transactionTime: Date;
  content: User;
}

export interface DeleteUserResponse extends AxiosResponse {
  transactionTime: Date;
  content: User;
}
