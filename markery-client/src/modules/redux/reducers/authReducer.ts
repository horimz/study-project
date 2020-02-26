import { IUser, Action, ActionTypes } from '../actions';

export const authReducer = (
  state: IUser | boolean | null = null,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchUser:
      return action.payload || false;
    default:
      return state;
  }
};
