import { Folders, Action, ActionTypes } from '../actions';

export const foldersReducer = (
  state: Folders | null = null,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchFolders:
      return action.payload;
    default:
      return state;
  }
};
