import { ACTIONS } from "../actions";

export default function(state = null, action) {
  switch (action.type) {
    case ACTIONS.MY_ORDERS:
      // api post process some data
      const data = action.payload.data;
      data.forEach(order => {
        order.created = new Date(order.created * 1000).toLocaleDateString();
        order.amount = `${order.amount / 100}`;
      });
      return action.payload.data;
    default:
      return state;
  }
}
