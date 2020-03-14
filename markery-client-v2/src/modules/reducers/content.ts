import {
  contentActionTypes,
  ContentState,
  ContentAction
} from '../actions/content';
import produce from 'immer';

const initialState: ContentState = {
  rootFolderId: null,
  folders: null,
  urls: null
};

export function contentReducer(
  state: ContentState = initialState,
  action: ContentAction
) {
  switch (action.type) {
    case contentActionTypes.FETCH_CONTENT_SUCCESS:
      return produce(state, draft => {
        draft.folders = action.payload.folders;
        draft.urls = action.payload.urls;
      });
    case contentActionTypes.FETCH_CONTENT_FAILURE:
      return produce(state, draft => {
        draft.folders = [];
        draft.urls = [];
      });
    case contentActionTypes.FETCH_ROOT_FOLDER_ID_SUCCESS:
      return produce(state, draft => {
        draft.rootFolderId = action.payload;
      });
    case contentActionTypes.FETCH_ROOT_FOLDER_ID_FAILURE:
      return produce(state, draft => {
        draft.rootFolderId = null;
      });
    case contentActionTypes.RESET_CONTENT:
      return produce(state, draft => {
        draft.folders = null;
        draft.urls = null;
      });
    case contentActionTypes.FETCH_ALL_FOLDERS_SUCCESS: {
      return produce(state, draft => {
        draft.folders = action.payload;
      });
    }
    case contentActionTypes.FETCH_ALL_FOLDERS_FAILURE:
      return produce(state, draft => {
        draft.folders = null;
      });
    case contentActionTypes.CREATE_FOLDER_SUCCESS:
      return produce(state, draft => {
        draft.folders?.push(action.payload);
      });
    case contentActionTypes.CREATE_FOLDER_FAILURE:
      return state;
    case contentActionTypes.UPDATE_FOLDER_SUCCESS:
      return produce(state, draft => {
        if (draft.folders) {
          draft.folders[
            draft.folders.findIndex(folder => folder._id === action.payload._id)
          ] = action.payload;
        }
      });
    case contentActionTypes.UPDATE_FOLDER_FAILURE:
      return state;
    case contentActionTypes.DELETE_FOLDER_SUCCESS:
      return produce(state, draft => {
        draft.folders?.splice(
          draft.folders.findIndex(folder => folder._id === action.payload._id),
          1
        );
      });
    case contentActionTypes.DELETE_FOLDER_FAILURE:
      return state;
    case contentActionTypes.FETCH_ALL_URL_SUCCESS:
      return produce(state, draft => {
        draft.urls = action.payload;
      });
    case contentActionTypes.FETCH_ALL_URL_FAILURE:
      return produce(state, draft => {
        draft.urls = null;
      });
    case contentActionTypes.CREATE_URL_SUCCESS:
      return produce(state, draft => {
        draft.urls?.push(action.payload);
      });
    case contentActionTypes.CREATE_URL_FAILURE:
      return state;
    case contentActionTypes.UPDATE_URL_SUCCESS:
      return produce(state, draft => {
        if (draft.urls) {
          draft.urls[
            draft.urls.findIndex(url => url._id === action.payload._id)
          ] = action.payload;
        }
      });
    case contentActionTypes.UPDATE_URL_FAILURE:
      return state;
    case contentActionTypes.DELETE_URL_SUCCESS:
      return produce(state, draft => {
        draft.urls?.splice(
          draft.urls.findIndex(url => url._id === action.payload._id),
          1
        );
      });
    case contentActionTypes.DELETE_URL_FAILURE:
      return state;
    default:
      return state;
  }
}
