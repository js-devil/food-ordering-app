import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route
  // Redirect
} from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./store/actions/auth";
import { storePath } from "./store/actions/path";
import "./App.css";

import Signin from "./components/auth/Signin";
import Menu from "./components/dashboard/Menu";
import Cart from "./components/dashboard/Cart";

import Navbar from "./components/navigation/Navbar";

class App extends Component {
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
          <Route exact path="/" component={Menu} />
          <Route path="/signin" component={Signin} />
          <div className="app">
            <Route path="/cart" component={Cart} />
          </div>
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
  storePath
};

export default connect(mapStateToProps, mapActionsToProps)(App);
