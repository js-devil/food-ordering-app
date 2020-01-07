export const SAVE_USER_DATA = "auth:saveLoginData";

export const saveLoginData = data => {
  return {
    type: SAVE_USER_DATA,
    data
  };
};

export const logout = data => {
  return dispatch => {
    dispatch(saveLoginData(data));
  };
};
