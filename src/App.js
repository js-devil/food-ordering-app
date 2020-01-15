import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./store/actions/auth";
import { getMenu } from "./store/actions/menu";
import { storePath } from "./store/actions/path";
import "./App.css";

import Signin from "./components/auth/Signin";

//  Dashboard
import Home from "./components/dashboard/Home";
import Menu from "./components/dashboard/Menu";
import Cart from "./components/dashboard/Cart";
import Recharge from "./components/dashboard/Recharge";

import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";

const AuthRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Object.keys(auth).length ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      )
    }
  />
);
class App extends Component {
  componentDidMount() {
    this.props.getMenu();
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          {/* navigation */}
          <Navbar
            choices={this.props.choices}
            auth={this.props.auth}
            logoutUser={this.props.logout}
            savePath={this.props.storePath}
          />

          {/* pages */}
          <Route path="/signin" component={Signin} />
          <Route auth={this.props.auth} path="/dashboard" component={Home} />
          <div className="app">
            <Route exact path="/" component={Menu} />
            <Route path="/cart" component={Cart} />
            <AuthRoute
              auth={this.props.auth}
              path="/recharge"
              component={Recharge}
            />
          </div>

          <Footer choices={this.props.choices} auth={this.props.auth} />
        </Router>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  // return state
  const { choices, auth } = state;
  return {
    choices,
    auth
  };
};

const mapActionsToProps = {
  logout,
  storePath,
  getMenu
};

export default connect(mapStateToProps, mapActionsToProps)(App);
