import { IFolderContents, Action, ActionTypes } from '../actions';

export const contentsReducer = (
  state: IFolderContents | null = null,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchFolderContents:
      return action.payload;
    default:
      return state;
  }
};
