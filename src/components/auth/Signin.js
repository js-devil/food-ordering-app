import React, { Component } from "react";

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
      viewPassword: false,
      loading: false,
      loadingText: "Login",
      errors: {
        username: "",
        password: "",
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
    const { username, password } = this.state;
    if (!username.length || !password.length) {
      Toast("error", "Please fill in all the fields!");
    } else if (username.length > 5 && password.length > 5) {
      this.setState({
        loading: true,
        loadingText: "Logging in",
      });
      this.login(this, { username, password });
    } else {
      this.setState({
        errors: {
          username:
            username.length < 6
              ? "Username must have at least 6 characters"
              : "",
          password:
            password.length < 6
              ? "Password must have at least 6 characters"
              : "",
        },
      });
    }
  };

  async login(self, data) {
    try {
      const res = await axios.post(`http://localhost:5000/users/login`, data);
      await self.props.saveLoginData(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      await self.props.getOrders(res.data.token, data.username);
      Toast("success", "Login Successful");
      if (
        data.username.includes("admin") ||
        data.username.includes("canteen")
      ) {
        await self.props.history.push("/admin");
        return;
      }
      await self.props.history.push("/dashboard");
    } catch (err) {
      self.setState({
        loading: false,
        loadingText: "Login",
      });

      if (!err.response) {
        Toast("error", "Network error!");
        return;
      }

      if (err.response && err.response.status === 400) {
        Toast("error", String(err.response.data.error));
        return;
      }
      Toast("error", "An error occured!");
    }
  }

  render() {
    return (
      <div className="signin-page">
        <div className="home">
          <Link to="/signup">
            <i className="material-icons">person_add</i>
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
                  style={{ textTransform: "lowercase" }}
                  onChange={this.handleInput}
                  type="text"
                  autoComplete="off"
                  className="validate"
                />
                <label htmlFor="username">Username</label>
                <span className="helper-text">
                  {this.state.errors.username}
                </span>
              </div>

              <div className="input-field col s12">
                <i className="material-icons prefix">lock</i>
                <input
                  id="password"
                  autoComplete="off"
                  type={this.state.viewPassword ? "text" : "password"}
                  onChange={this.handleInput}
                  className="validate"
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
                <span className="helper-text">
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
