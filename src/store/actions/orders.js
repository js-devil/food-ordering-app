import axios from "axios";
import Toast from "../../components/functions/Toast";
import { logout } from "./auth";
export const STORE_ORDER_DATA = "orders:storeOrders";
export const UPDATE_ORDERS = "orders:updateOrders";

export const storeOrders = data => {
  return {
    type: STORE_ORDER_DATA,
    data
  };
};

export const updateOrders = data => {
  return {
    type: UPDATE_ORDERS,
    data
  };
};

export const getOrders = (token, self, name) => {
  let url = name.includes("admin") || name.includes("canteen") ? "/all" : "";
  return async dispatch => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:5000/orders${url}`,
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
      if (!err.response) {
        Toast("error", "Network error!");
        return;
      }

      if (err.response.status === 400) {
        if (err.response.data.error.includes("jwt expired")) {
          Toast("info", "Session expired!");
          logout({});
          self.props.history.push("/");
          return;
        }
        Toast("error", String(err.response.data.error));
        return;
      }
      Toast("error", "An error occured!");
    }
  };
};
