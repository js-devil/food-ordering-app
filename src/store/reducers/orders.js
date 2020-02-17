import { STORE_ORDER_DATA, UPDATE_ORDERS } from "../actions/orders";

const orders = (state = [], { type, data }) => {
  switch (type) {
    case STORE_ORDER_DATA || UPDATE_ORDERS:
      return data;
    default:
      return state;
  }
};

export default orders;
