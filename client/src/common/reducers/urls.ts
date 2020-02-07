import { Urls, Action, ActionTypes } from '../actions';

export const urlsReducer = (state: Urls | null = null, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchUrls:
      return action.payload;
    default:
      return state;
  }
};
