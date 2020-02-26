import { IFolder, Action, ActionTypes } from '../actions';

export const foldersReducer = (
  state: IFolder[] | null = null,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.fetchFolders:
      return action.payload;
    case ActionTypes.addFolder: {
      if (state === null)
        throw new Error('Do not add a folder before fetching contents.');
      return [...state, action.payload];
    }
    case ActionTypes.editFolder:
      if (state === null) throw new Error('You must first fetch folders.');
      return state.map(folder => {
        if (folder._id === action.payload._id) {
          return {
            ...folder,
            folderName: action.payload.folderName
          };
        } else {
          return folder;
        }
      });
    case ActionTypes.deleteFolder:
      if (state === null) throw new Error('You must first fetch folders.');
      return state.filter(folder => folder._id !== action.payload);
    case ActionTypes.resetFolders:
      return action.payload;
    default:
      return state;
  }
};
