import { IUrl, Action, ActionTypes } from '../actions';

export const urlsReducer = (state: IUrl[] | null = null, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchUrls:
      return action.payload;
    default:
      return state;
  }
};
