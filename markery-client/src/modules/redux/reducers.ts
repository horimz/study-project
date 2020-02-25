import { combineReducers } from 'redux';
import { IUser, IFolder, IUrl, Action, ActionTypes } from './actions';

export interface StoreState {
  auth: IUser | boolean | null;
  folders: IFolder[];
  urls: IUrl[];
  rootFolderId: string | null;
  selectedFolders: string[]; // Ids
  selectedUrls: string[]; // Ids
}

export const rootReducer = combineReducers<StoreState>({
  auth: (state: IUser | boolean | null = null, action: Action) => {
    switch (action.type) {
      case ActionTypes.fetchUser:
        return action.payload || false;
      default:
        return state;
    }
  },
  folders: (state: IFolder[] = [], action: Action) => {
    switch (action.type) {
      case ActionTypes.fetchFolders:
        return action.payload;
      case ActionTypes.addFolder: {
        if (state === null)
          throw new Error('Do not add a folder before fetching contents.');
        return [...state, action.payload];
      }
      case ActionTypes.editFolder:
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
        return state.filter(folder => folder._id !== action.payload);
      default:
        return state;
    }
  },
  urls: (state: IUrl[] = [], action: Action) => {
    switch (action.type) {
      case ActionTypes.fetchUrls:
        return action.payload;
      case ActionTypes.addUrl:
        if (state === null)
          throw new Error('Do not add a url before fetching contents.');
        return [...state, action.payload];
      case ActionTypes.editUrl:
        return state.map(url => {
          if (url._id === action.payload._id) {
            return {
              ...url,
              url: action.payload.url,
              alias: action.payload.alias,
              description: action.payload.description
            };
          } else {
            return url;
          }
        });
      case ActionTypes.deleteUrl:
        return state.filter(url => url._id !== action.payload);
      default:
        return state;
    }
  },
  rootFolderId: (state: string | null = null, action: Action) => {
    switch (action.type) {
      case ActionTypes.fetchRootFolder:
        return action.payload;
      default:
        return state;
    }
  },
  selectedFolders: (state: string[] = [], action: Action) => {
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
  },
  selectedUrls: (state: string[] = [], action: Action) => {
    switch (action.type) {
      case ActionTypes.addUrlToSelectedUrls:
        return [...state, action.payload];
      case ActionTypes.removeUrlFromSelectedUrls:
        return state.filter(id => id !== action.payload);
      case ActionTypes.resetSelectedContents:
        return [];
      default:
        return state;
    }
  }
});

export type RootState = ReturnType<typeof rootReducer>;
