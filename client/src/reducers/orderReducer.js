import { ACTIONS } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case ACTIONS.MY_ORDERS:
      // api post process some data
      const data = action.payload.data;
      const convertEpoch = data.map(order => {
        order.created = new Date(order.created * 1000).toLocaleDateString();
        order.amount = `${order.amount / 100}`;
      });
      return action.payload.data;
    default:
      return state;
  }
}
