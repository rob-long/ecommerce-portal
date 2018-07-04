import { ACTIONS } from "../actions";

export default function(state = null, action) {
  switch (action.type) {
    case ACTIONS.MY_SCORES:
      return action.payload;
    default:
      return state;
  }
}
