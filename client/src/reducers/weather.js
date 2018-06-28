import { ACTIONS } from "../actions";

export default function weather(state = [], action) {
  switch (action.type) {
    case ACTIONS.FETCH_POST:
      return null;
    default:
      return null;
  }
  return state;
}
