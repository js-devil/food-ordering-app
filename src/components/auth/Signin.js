import React, { Component } from "react";

import { connect } from "react-redux";
import { saveLoginData } from "../../store/actions/auth";
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
        password: ""
      }
    };
  }

  // methods
  handleInput = ({ target }) => {
    this.setState({
      [target.id]: target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    if (!username.length || !password.length) {
      Toast("error", "Please fill in all the fields!");
    } else if (username.length > 5 && password.length > 5) {
      this.setState({
        loading: true,
        loadingText: "Logging in"
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
              : ""
        }
      });
    }
  };

  async login(self, data) {
    try {
      const res = await axios.post("http://localhost:5000/users/login", data);
      self.props.saveLoginData(res.data);
      Toast("success", 'Login Successful')
      self.props.history.push("/");
    } catch (err) {
      self.setState({
        loading: false,
        loadingText: "Login"
      });

      console.log(err);
    }
  }

  render() {
    return (
      <div className="signin-page">
        <div className="home">
          <Link to="/">
            <i className="material-icons">home</i>
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
                <span className="helper-text pass-bg">
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

const mapStateToProps = state => {
  // return state
  const { auth } = state;
  return {
    auth
  };
};

const mapActionsToProps = {
  saveLoginData
};

export default connect(mapStateToProps, mapActionsToProps)(Signin);
