import React from "react";
import axios from "axios";
import Toast from "./Toast";

const ChangePassword = (props) => {
  const types = { old_password: "", new_password: "", confirm: "" };
  const Endpoint = `http://localhost:5000`;
  const state = {
    old_password: "",
    new_password: "",
    confirm: "",
    loading: false,
    errors: types,
  };

  const { auth, catchErrors } = props;

  const [
    { old_password, new_password, confirm, loading, errors },
    changeState,
  ] = React.useState(state);

  const handleInput = ({ target }) => {
    changeState((key) => ({
      ...key,
      [target.id]: target.value,
      errors: {
        ...errors,
        [target.id]:
          target.value && target.value.length < 6
            ? "Must have at least 6 characters"
            : target.id === "confirm" && target.value !== new_password
            ? "Passwords do not match"
            : "",
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!old_password.length || !new_password.length || !confirm.length) {
      Toast("error", "Fill in all fields!");
      return;
    } else if (new_password !== confirm) {
      return;
    } else if (
      old_password.length >= 6 &&
      new_password.length >= 6 &&
      new_password === confirm
    ) {
      changeState((key) => ({
        ...key,
        loading: true,
      }));
      changeMyPassword({ old_password, new_password });
    }
  };

  const changeMyPassword = async (data) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${Endpoint}/users/change-password`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        data,
      });
      Toast("success", res.data.status);
      changeState((key) => ({
        ...key,
        ...state,
      }));
      document.getElementById("form").reset();
    } catch (err) {
      changeState((key) => ({
        ...key,
        loading: false,
      }));

      if (!err.response) {
        Toast("error", "Network error!");
        return;
      }
      catchErrors(err.response);
    }
  };

  const loader = (
    <div className="loader">
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="change-password">
      <form className="col s12" id="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="input-field pw-field col s12">
            <input
              id="old_password"
              disabled={loading}
              style={{ textTransform: "lowercase", fontSize: "30px" }}
              onChange={(e) => handleInput(e)}
              type="password"
              autoComplete="off"
              className="validate"
            />
            <label htmlFor="old_password">Old Password</label>
            <span className="helper-text">{errors.old_password}</span>
          </div>

          {loading ? loader : ""}

          <div className="input-field pw-field col s12">
            <input
              id="new_password"
              disabled={loading}
              style={{ textTransform: "lowercase", fontSize: "30px" }}
              autoComplete="off"
              type="password"
              onChange={(e) => handleInput(e)}
              className="validate"
            />
            <label htmlFor="new_password">New Password</label>
            <span className="helper-text">{errors.new_password}</span>
          </div>

          <div className="input-field pw-field col s12">
            <input
              id="confirm"
              style={{ textTransform: "lowercase", fontSize: "30px" }}
              autoComplete="off"
              disabled={loading}
              type="password"
              onChange={(e) => handleInput(e)}
              className="validate"
            />
            <label htmlFor="confirm">Confirm Password</label>
            <span className="helper-text">{errors.confirm}</span>
          </div>

          <div className="signin-btn">
            <button onClick={handleSubmit} disabled={loading}>
              Change
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
