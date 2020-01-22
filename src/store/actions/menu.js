import axios from "axios";

export const STORE_MENU_DATA = "menu:storeMenuData";

export const storeMenuData = data => {
  return {
    type: STORE_MENU_DATA,
    data
  };
};

export const getMenu = self => {
  return async dispatch => {
    try {
      const res = await axios.get("http://localhost:5000/menu");
      const menu = res.data.menu.length ? res.data.menu : [];
      dispatch(storeMenuData(menu));

      if (self && Object.keys(self).length) {
        self.setState({
          menu
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
};
