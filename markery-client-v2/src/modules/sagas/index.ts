import { all } from "redux-saga/effects";
import { authSagas } from "./auth";

export function* rootSaga() {
  yield all([...authSagas]);
}
