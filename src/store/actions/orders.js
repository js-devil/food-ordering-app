import axios from "axios";

export const STORE_ORDER_DATA = "orders:storeOrders";

export const storeOrders = data => {
  return {
    type: STORE_ORDER_DATA,
    data
  };
};

export const getOrders = token => {
  return async dispatch => {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:5000/orders",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      let orders = res.data.orders.length ? res.data.orders : [];
      orders = orders.map(key => {
        return {
          ...key,
          time_of_order: String(new Date(key.time_of_order)).slice(4, 15),
          choices: JSON.parse(key.user_order)
            .map(key => [key.name])
            .join(", ")
        };
      });

      dispatch(storeOrders(orders));
    } catch (err) {
      console.log(err);
      // this.checkErrors(err);
    }
  };
};
