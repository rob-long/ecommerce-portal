import { ACTIONS } from "../actions";

export default function(state = null, action) {
  switch (action.type) {
    case ACTIONS.AUTHENTICATE:
      // return false if not logged inspect
      // return user model if logged in
      // default return null
      return action.payload || false;
    default:
      return state;
  }
}
