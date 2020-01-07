import menu from "./menu";
export const SHOW_ERROR = "showError";
// import auth from "./auth"

export const errors = ({ payload }) => {
  return {
    type: SHOW_ERROR,
    payload
  };
};
