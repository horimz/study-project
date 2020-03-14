import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { GlobalStyles } from "./GlobalStyles";
import { HelmetProvider } from "react-helmet-async";

// Redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./modules";
import { rootSaga } from "./modules/sagas";
import { storage } from "./lib/storage";
import { setUser, fetchUserRequest } from "./modules/actions/auth";
import { fetchRootFolderIdRequest } from "./modules/actions/content";

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  (window as any).__REDUX_STATE__,
  composeWithDevTools(applyMiddleware(logger, sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

function loadUser() {
  const user = storage.getItem("CURRENT_USER");
  if (user) {
    store.dispatch(setUser(user));
    store.dispatch(fetchUserRequest());
    store.dispatch(fetchRootFolderIdRequest());
  }
}

loadUser();

ReactDOM.render(
  <HelmetProvider>
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>
  </HelmetProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
