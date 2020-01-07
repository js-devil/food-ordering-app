import { STORE_PATH } from "../actions/path";

const path = (state = "", { type, data }) => {
  switch (type) {
    case STORE_PATH:
      console.log(data);
      return data;
    default:
      return state;
  }
};

export default path;
