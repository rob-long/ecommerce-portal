import axios from "axios";

export const ACTIONS = {
  AUTHENTICATE: "AUTHENTICATE",
  MY_SURVEYS: "MY_SURVEYS",
  MY_ORDERS: "MY_ORDERS",
  MY_ORDER: "MY_ORDER",
  MY_SCORES: "MY_SCORES",
  CHECKOUT: "CHECKOUT"
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

export const handleOrder = (token, sku, history) => async dispatch => {
  const res = await axios.post("/api/stripe/order", { token, sku });
  console.log(res.data.error);
  dispatch({ type: ACTIONS.CHECKOUT, payload: res.data });
  history.push("/orders");
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
  dispatch({ type: ACTIONS.MY_ORDERS, payload: res.data });
};

export const fetchOrder = id => async dispatch => {
  const res = await axios.get(`/api/stripe/orders/${id}`);
  dispatch({ type: ACTIONS.MY_ORDER, payload: res.data });
};

export const saveFile = data => async dispatch => {
  const filterRows = data.filter(row => row[3] > 0);
  const vitaminScore = filterRows.reduce((acc, curr, i) => {
    acc[curr[0]] = curr[3];
    return acc;
  }, {});
  // upload returns all scores
  const res = await axios.post("/api/scores", vitaminScore);
  console.log(res.data);
  dispatch({ type: ACTIONS.MY_SCORES, payload: res.data });
};

export const fetchScores = () => async dispatch => {
  const res = await axios.get("/api/scores");
  dispatch({ type: ACTIONS.MY_SCORES, payload: res.data });
};
