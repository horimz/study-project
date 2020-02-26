import { Action, ActionTypes } from '../actions';

export const rootFolderReducer = (
  state: string | null = null,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchRootFolder:
      return action.payload;
    default:
      return state;
  }
};
