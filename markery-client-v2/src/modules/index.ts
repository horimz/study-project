import { combineReducers } from "redux";

export type RootState = {
  auth: any;
};

const rootReducer = combineReducers({
  auth: () => null
});

export { rootReducer };
