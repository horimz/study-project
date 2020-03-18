import { User } from "../../../lib/api/auth/types";

export interface AuthState {
  user: User | null;
}

// TODO: any way for typesafe actions?
export interface AuthAction {
  type: string;
  payload?: any;
}
