import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { GlobalStyles } from "./GlobalStyles";
import { HelmetProvider } from "react-helmet-async";
// import { storage } from "./lib/storage";

// Redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { createLogger } from "redux-logger";
import { rootReducer } from "./modules";

const logger = createLogger();

const store = createStore(
  rootReducer,
  (window as any).__REDUX_STATE__,
  composeWithDevTools(applyMiddleware(logger))
);

// TODO: load cached user information

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
