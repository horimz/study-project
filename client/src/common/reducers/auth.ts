import { User, Action, ActionTypes } from '../actions';

export const authReducer = (
  state: User | boolean | null = null,
  action: Action
) => {
  switch (action.type) {
    // null: before fetching
    // false: not logged in
    case ActionTypes.fetchUser:
      return action.payload || false;
    default:
      return state;
  }
};
