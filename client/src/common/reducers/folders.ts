import { IFolder, Action, ActionTypes } from '../actions';

export const foldersReducer = (
  state: IFolder[] | null = null,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchFolders:
      return action.payload;
    default:
      return state;
  }
};
