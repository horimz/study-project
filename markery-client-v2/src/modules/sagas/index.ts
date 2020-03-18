import _ from "lodash";
import { all } from "redux-saga/effects";
import { authSagas } from "./auth";
import { contentSagas } from "./content";

const sagas = _.concat(authSagas, contentSagas);

export function* rootSaga() {
  yield all([...sagas]);
}
