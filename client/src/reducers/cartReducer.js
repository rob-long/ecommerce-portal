import { ACTIONS } from "../actions";

export default function(state = null, action) {
  switch (action.type) {
    case ACTIONS.CHECKOUT:
      return action.payload || false;
    default:
      return state;
  }
}
