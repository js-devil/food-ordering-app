import React, { Component } from "react";
import { validatePassword, validateName, validatePhone } from "./validation";

import { connect } from "react-redux";
import { saveLoginData } from "../../store/actions/auth";
import { getOrders } from "../../store/actions/orders";
import Toast from "../functions/Toast";

import { Link } from "react-router-dom";
import axios from "axios";

import "../../assets/css/Signin.css";
import logo from "../../assets/img/full_logo.png";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      phone: "",
      viewPassword: false,
      loading: false,
      loadingText: "Sign Up",
      errors: {
        username: "",
        password: "",
        phone: "",
      },
    };
  }

  // methods
  handleInput = ({ target }) => {
    this.setState({
      [target.id]: target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, phone } = this.state;
    if (!username.length || !password.length)
      return Toast("error", "Please fill in all the fields!");

    if (username.includes("admin") || username.includes("canteen"))
      return Toast("error", "This username has been taken!");

    if (
      !validateName(username) ||
      !validatePassword(password) ||
      !validatePhone(phone)
    )
      return this.setState({
        errors: {
          username: !validateName(username)
            ? "Username must be a single name with at least 4 letters"
            : "",
          password: !validatePassword(password)
            ? "Password must be alphanumeric with at least 6 characters"
            : "",
          phone: !validatePhone(phone)
            ? "Phone number must have 11 numbers"
            : "",
        },
      });

    this.setState({
      loading: true,
      loadingText: "Registering",
      errors: {
        username: "",
        password: "",
        phone: "",
      },
    });

    this.register(this, {
      username: username.toLowerCase(),
      password: password.toLowerCase(),
      phone,
    });
  };

  async register(self, data) {
    try {
      const res = await axios.post(
        `https://food-ordering-system-nan.herokuapp.com/users/register`,
        data
      );
      await self.props.saveLoginData(res.data);
      await self.props.getOrders(res.data.token, data.username);
      Toast("success", "Registration Successful");
      await self.props.history.push("/dashboard");
    } catch (err) {
      self.setState({
        loading: false,
        loadingText: "Sign Up",
      });

      if (!err.response) {
        Toast("error", "Network error!");
        return;
      }

      if (err.response.status === 400) {
        Toast("error", String(err.response.data.error));
        return;
      }
      Toast("error", "An error occured!");
    }
  }

  render() {
    return (
      <div className="signin-page signup">
        <div className="home">
          <Link to="/">
            <i className="material-icons">person</i>
          </Link>
        </div>

        <div className="logo-container">
          <img src={logo} alt="McU Logo" />
        </div>

        <div className="signin-form">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="username"
                  disabled={this.state.loading}
                  onChange={this.handleInput}
                  type="text"
                  style={{ textTransform: "lowercase" }}
                  className="validate"
                />
                <label htmlFor="username">Username</label>
                <span className="helper-text">
                  {this.state.errors.username}
                </span>
              </div>

              <div className="input-field col s12">
                <i className="material-icons prefix">phone</i>
                <input
                  id="phone"
                  disabled={this.state.loading}
                  onChange={this.handleInput}
                  type="number"
                  maxLength="11"
                  autoComplete="off"
                  className="validate"
                />
                <label htmlFor="username">Phone Number</label>
                <span className="helper-text">{this.state.errors.phone}</span>
              </div>

              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input
                  id="password"
                  type={this.state.viewPassword ? "text" : "password"}
                  onChange={this.handleInput}
                  className="validate"
                  autoComplete="off"
                />
                <span
                  className="view-pass"
                  disabled={this.state.loading}
                  onClick={() =>
                    this.setState({ viewPassword: !this.state.viewPassword })
                  }
                >
                  {this.state.viewPassword ? (
                    <i className="material-icons">close</i>
                  ) : (
                    <i className="material-icons">remove_red_eye</i>
                  )}
                </span>
                <label htmlFor="password">Password</label>
                <span
                  className={`helper-text ${
                    this.state.errors.password ? "pass-bg" : ""
                  }`}
                >
                  {this.state.errors.password}
                </span>
              </div>
            </div>
          </form>

          <div className="signin-btn">
            <button onClick={this.handleSubmit} disabled={this.state.loading}>
              {this.state.loadingText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // return state
  const { auth } = state;
  return {
    auth,
  };
};

const mapActionsToProps = {
  saveLoginData,
  getOrders,
};

export default connect(mapStateToProps, mapActionsToProps)(Signin);
