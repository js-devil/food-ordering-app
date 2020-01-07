import { SAVE_USER_DATA } from "../actions/auth";

const auth = (state = {}, { type, data }) => {
  switch (type) {
    case SAVE_USER_DATA:
      console.log(data);
      return data;
    default:
      return state;
  }
};

export default auth;
