import { Action, ActionTypes } from '../actions';

export const selectedFoldersReducer = (
  state: string[] = [],
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.addFolderToSelectedFolders:
      return [...state, action.payload];
    case ActionTypes.removeFolderFromSelectedFolders:
      return state.filter(id => id !== action.payload);
    case ActionTypes.resetSelectedContents:
      return [];
    default:
      return state;
  }
};
