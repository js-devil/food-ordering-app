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

import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";

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
      menuModal: true
    };
  }
  componentDidMount() {
    this.props.getMenu();
  }

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
            path="/dashboard"
            component={Home}
          />
          <div className="app">
            {/* <Route path="/menu" component={Menu} /> */}
            <AuthRoute
              path="/cart"
              auth={this.props.auth}
              component={Cart}
            />
            
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
