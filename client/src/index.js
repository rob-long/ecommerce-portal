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
window.axios = axios;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(ReduxPromise, thunk))
);

/*
const createStoreWithMiddleware = applyMiddleware(ReduxPromise, thunk)(
  createStore
);
*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

//registerServiceWorker();
