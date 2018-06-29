import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import surveyReducer from "./surveyReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  surveys: surveyReducer,
  orders: orderReducer
});

export default rootReducer;
