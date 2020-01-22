import { STORE_ORDER_DATA } from "../actions/orders";

const orders = (state = [], { type, data }) => {
  switch (type) {
    case STORE_ORDER_DATA:
      return data;
    default:
      return state;
  }
};

export default orders;
