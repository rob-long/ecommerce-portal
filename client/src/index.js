import "./globals";
import "./vendor/dist/toolkit-light.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import ReduxPromise from "redux-promise";
import App from "./components/App";
import "./index.css";
import rootReducer from "./reducers";
import axios from "axios";
import "./vendor/js/bootstrap/collapse.js";
//import $ from "jquery";
//import "./vendor/dist/toolkit";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
window.axios = axios;

const history = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancers(
    applyMiddleware(routerMiddleware(history), ReduxPromise, thunk)
  )
);
/* compose -> composeEnhancers is for chrome redux extension */

/*
const createStoreWithMiddleware = applyMiddleware(ReduxPromise, thunk)(
  createStore
);
*/

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.querySelector("#root")
);

//registerServiceWorker();
