import { IUrl, Action, ActionTypes } from '../actions';

export const urlsReducer = (state: IUrl[] | null = null, action: Action) => {
  switch (action.type) {
    case ActionTypes.fetchUrls:
      return action.payload;
    case ActionTypes.addUrl:
      if (state === null)
        throw new Error('Do not add a url before fetching contents.');
      return [...state, action.payload];
    case ActionTypes.editUrl:
      if (state === null) throw new Error('You must first fetch urls.');
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
      if (state === null) throw new Error('You must first fetch urls.');
      return state.filter(url => url._id !== action.payload);
    case ActionTypes.resetUrls:
      return action.payload;
    default:
      return state;
  }
};
