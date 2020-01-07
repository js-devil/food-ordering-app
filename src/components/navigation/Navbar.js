import React from "react";
import { Link, withRouter } from "react-router-dom";

import "../../assets/css/Navbar.css";
import logo from "../../assets/img/logo.png";
// import login from "../../assets/img/login.png";

const Navbar = props => {
  const Naira = <span>&#8358;</span>;
  const { choices, auth, savePath } = props;
  const { username, image_url, balance } = auth;
  const location = props.location.pathname;
  const navMenu = (
    <Link to="#" data-target="mobile-demo" className="sidenav-trigger">
      <i className="material-icons">menu</i>
    </Link>
  );

  const signinBtn = (
    <Link to="/signin">
      {/* <img src={login} className="login" alt="Signin" /> */}
      <i className="material-icons login">person</i>
    </Link>
  );

  const authNav = Object.keys(auth).length ? navMenu : signinBtn;

  const cartNav = (
    <span onClick={() => props.history.goBack()}>
      <i className="material-icons">chevron_left</i>
    </span>
  );

  React.useEffect(() => {
    // console.log(location);
    savePath(location)
  }, [location, savePath]);

  return (
    <div style={location.includes("sign") ? { display: "none" } : {}}>
      <nav>
        <div className="nav-wrapper">
          <Link to="#" className="brand-logo">
            {location.replace("/", "")}
          </Link>

          {location.includes("cart") ? cartNav : authNav}

          {!location.includes("cart") && choices.length ? (
            <Link to="/cart" className="cart">
              <span className="picked_no">
                {choices.length ? choices.length : ""}
              </span>
              <i className="material-icons">shopping_cart</i>
            </Link>
          ) : (
            ""
          )}
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li className="logo">
          <img src={logo} alt="McU Logo" />
          <h5>Food Order System</h5>
        </li>
        <li className="profile">
          {image_url ? (
            <img src={image_url} alt="profile" />
          ) : (
            <img
              src="https://www.bootdey.com/img/Content/avatar/avatar7.png"
              alt="profile"
            />
          )}
          <h5>{username}</h5>
          <p>
            {Naira}
            {balance}
          </p>
        </li>
        <li className="active">
          {" "}
          <Link to="/">
            {" "}
            <i className="material-icons">home</i> Home{" "}
          </Link>
        </li>
        <li>
          <Link to="/orders">
            {" "}
            <i className="material-icons">format_list_bulleted</i> My Orders{" "}
          </Link>
        </li>
        <li>
          <Link to="/recharge">
            {" "}
            <i className="material-icons">attach_money</i> Recharge{" "}
          </Link>
        </li>
        <li>
          <Link to="/settings">
            {" "}
            <i className="material-icons">settings</i> Settings{" "}
          </Link>
        </li>
        <li>
          <Link
            to="#"
            onClick={() => {
              props.logoutUser({});
              props.history.push("/signin");
            }}
          >
            <i className="material-icons">power_settings_new</i> Logout
          </Link>
        </li>
        <div className="footer">
          <p>Designed by Nandar Oise</p>
        </div>
      </ul>
    </div>
  );
};

export default withRouter(Navbar);
