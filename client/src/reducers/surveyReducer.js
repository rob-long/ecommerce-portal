import { ACTIONS } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case ACTIONS.MY_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
