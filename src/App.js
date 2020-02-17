import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./store/actions/auth";
import { getMenu } from "./store/actions/menu";
import { storePath } from "./store/actions/path";
import "./App.css";

import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";

//  Dashboard
import Home from "./components/dashboard/Home";
// import Menu from "./components/dashboard/Menu";
import Cart from "./components/dashboard/Cart";
import Recharge from "./components/dashboard/Recharge";
import Settings from "./components/dashboard/Settings.js";

import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
import Toast from "./components/functions/Toast";

const errors = ({ status, data }) => {
  if (status === 400) {
    if (data.error.includes("jwt expired")) {
      Toast("info", "Session expired!");
      this.props.logout({});
      this.props.history.push("/");
      return;
    }
    Toast("error", String(data.error));
    return;
  }
  Toast("error", "An error occured!");
};

const AuthRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Object.keys(auth).length ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
      status: "",
      range: "",
      menuModal: true
    };
  }
  componentDidMount() {
    this.props.getMenu();
  }

  getRange = range => {
    console.log(range);
    this.setState({
      range
    });
  };

  getCategory = category => {
    this.setState({
      category
    });
  };

  getStatus = status => {
    this.setState({
      status
    });
  };

  switchModal = menuModal => {
    this.setState({
      menuModal
    });
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          {/* navigation */}
          <Navbar
            choices={this.props.choices}
            auth={this.props.auth}
            menuModal={this.state.menuModal}
            logoutUser={this.props.logout}
            savePath={this.props.storePath}
            getCategory={this.getCategory}
            getStatus={this.getStatus}
          />

          {/* pages */}
          <Route exact path="/" component={Signin} />
          <Route exact path="/signup" component={Signup} />
          <AuthRoute
            auth={this.props.auth}
            category={this.state.category}
            status={this.state.status}
            switch={this.switchModal}
            dateRange={this.state.range}
            path="/dashboard"
            catchErrors={errors}
            component={Home}
          />
          <div className="app">
            {/* <Route path="/menu" component={Menu} /> */}
            <AuthRoute
              path="/cart"
              auth={this.props.auth}
              component={Cart}
              catchErrors={errors}
            />

            <AuthRoute
              auth={this.props.auth}
              path="/recharge"
              component={Recharge}
              catchErrors={errors}
            />

            <AuthRoute
              auth={this.props.auth}
              catchErrors={errors}
              path="/settings"
              component={Settings}
            />
          </div>

          <Footer
            choices={this.props.choices}
            menuModal={this.state.menuModal}
            changeRange={this.getRange}
            auth={this.props.auth}
          />
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
