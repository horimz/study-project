import { Action, ActionTypes } from '../actions';

export const selectedurlsReducer = (state: string[] = [], action: Action) => {
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
};
