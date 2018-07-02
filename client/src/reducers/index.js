import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import surveyReducer from "./surveyReducer";
import orderReducer from "./orderReducer";
import healthReducer from "./healthReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  surveys: surveyReducer,
  orders: orderReducer,
  health: healthReducer,
  cart: cartReducer
});

export default rootReducer;
