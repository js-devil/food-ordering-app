export const SAVE_USER_DATA = "auth:saveLoginData";

export const saveLoginData = (data) => ({
  type: SAVE_USER_DATA,
  data,
});

export const logout = (data) => {
  return (dispatch) => {
    localStorage.removeItem("user");
    dispatch(saveLoginData(data));
  };
};
