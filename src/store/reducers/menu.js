import { STORE_MENU_DATA } from "../actions/menu";

export const menuLoading = (state = true, { type, payload }) => {
  switch (type) {
    case STORE_MENU_DATA:
      return false;
    default:
      return state;
  }
};

export const menu = (state = [], { type, data }) => {
  switch (type) {
    case STORE_MENU_DATA:
      return data;
    default:
      return state;
  }
};
