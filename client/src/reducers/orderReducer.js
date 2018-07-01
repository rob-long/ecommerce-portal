import { ACTIONS } from "../actions";
import _ from "lodash";

export default function(state = {}, action) {
  switch (action.type) {
    case ACTIONS.MY_ORDERS:
      // api post process some data
      const data = action.payload.data;
      data.forEach(order => {
        order.created = new Date(order.created * 1000).toLocaleDateString();
        order.amount = `${order.amount / 100}`;
      });
      return _.mapKeys(data, "id");
    case ACTIONS.MY_ORDER:
      return Object.assign({}, state, {
        [action.payload.id]: action.payload
      });
    default:
      return state;
  }
}
