import { FetchUserAction } from './user';

export enum ActionTypes {
  fetchUser
}

// TODO: chain other type definition when added
export type Action = FetchUserAction;
