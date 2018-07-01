import axios from "axios";

export const ACTIONS = {
  AUTHENTICATE: "AUTHENTICATE",
  MY_SURVEYS: "MY_SURVEYS",
  MY_ORDERS: "MY_ORDERS",
  MY_ORDER: "MY_ORDER"
};

// without redux thunk we would need redux-promise to unpack the promise
export function authenticateOld() {
  const url = `/api/current_user`;
  const request = axios.get(url);
  return {
    type: ACTIONS.AUTHENTICATE,
    payload: request
  };
}

// with redux-thunk we can unpack the promise ourselves by waiting for axios.get to be done before dispatching
// utilize redux thunk by returning an action instead of an action creator as above
// redux-thunk will automatically pass in the "hidden" dispatch for us to use
export const authenticateOld2 = () => {
  return function(dispatch) {
    axios
      .get("/api/current_user")
      .then(res => dispatch({ type: ACTIONS.AUTHENTICATE, payload: res }));
  };
};

// refactor using async await
// set payload to just the data property of response
export const authenticate = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: ACTIONS.AUTHENTICATE, payload: res.data });
};

// example of another action creator that
// goes to the same reducer because it dispatches the same type
export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", { token });
  dispatch({ type: ACTIONS.AUTHENTICATE, payload: res.data });
};

export const handleOrder = (token, sku) => async dispatch => {
  console.log(sku);
  const res = await axios.post("/api/stripe/order", { token, sku });
  dispatch({ type: ACTIONS.MY_ORDERS, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values);
  history.push("/surveys");
  dispatch({ type: ACTIONS.AUTHENTICATE, payload: res.data });
};

export const fetchSurveys = user => async dispatch => {
  const res = await axios.get("/api/surveys");
  dispatch({ type: ACTIONS.MY_SURVEYS, payload: res.data });
};

export const fetchOrders = () => async dispatch => {
  const res = await axios.get("/api/stripe/orders");
  console.log(res.data);
  dispatch({ type: ACTIONS.MY_ORDERS, payload: res.data });
};

export const fetchOrder = id => async dispatch => {
  const res = await axios.get(`/api/stripe/orders/${id}`);
  console.log(res.data);
  dispatch({ type: ACTIONS.MY_ORDER, payload: res.data });
};
