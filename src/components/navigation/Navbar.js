import React from "react";
import { Link, withRouter } from "react-router-dom";

import "../../assets/css/Navbar.css";
import logo from "../../assets/img/logo.png";
// import login from "../../assets/img/login.png";

export const categories = [
  "All",
  "Rice",
  "Yam",
  "Beans",
  "Swallow",
  "Others",
  "Drinks",
  "Specials",
];

const Navbar = (props) => {
  const Naira = <span>&#8358;</span>;
  const { auth, savePath, getCategory, menuModal, getStatus } = props;
  const { username, image_url, balance } = auth;
  const location = props.location.pathname;
  const navMenu = (
    <Link to="#" data-target="mobile-demo" className="sidenav-trigger">
      <i className="material-icons">menu</i>
    </Link>
  );

  const locationName = location.replace("/", "");
  const links = ["Home", "Recharge", "Settings"];
  const addNew = (
    <span onClick={() => props.history.goBack()}>
      <i className="material-icons">chevron_left</i>
    </span>
  );

  const authNav =
    Object.keys(auth).length &&
    !auth.username.includes("admin") &&
    !auth.username.includes("canteen")
      ? navMenu
      : location.includes("menu") || location.includes("orders")
      ? addNew
      : "";

  const cartNav = (
    <span onClick={() => props.history.goBack()}>
      <i className="material-icons">chevron_left</i>
    </span>
  );

  const status_ = locationName.includes("order") ? true : false;

  const caret = <i className="material-icons caret">arrow_drop_down</i>;

  const statuses = ["Pending", "Cancelled", "Completed"];
  const [{ category, status }, setFilter] = React.useState({
    category: "All",
    status: status_ ? "Pending" : "Status",
  });

  React.useEffect(() => {
    getCategory(category);
    getStatus(status);
    savePath(location);
  }, [location, savePath, category, getCategory, status, getStatus]);

  return (
    <div
      style={
        location.includes("sign") || location === "/" ? { display: "none" } : {}
      }
    >
      <nav className={location.includes("dashboard") ? "no-shadow" : ""}>
        <div className="nav-wrapper">
          <Link to="#" className="brand-logo">
            {!locationName.includes("dashboard") ? locationName : ""}
          </Link>

          {location.includes("cart") ? cartNav : authNav}

          {location.includes("dashboard") ? (
            menuModal ? (
              <div
                className="waves-effect waves-light modal-trigger link-text"
                href="#category"
              >
                <p>
                  {" "}
                  {category} {caret}{" "}
                </p>
              </div>
            ) : (
              <div
                className="waves-effect waves-light modal-trigger link-text"
                href="#status"
              >
                <p>
                  {" "}
                  {status} {caret}{" "}
                </p>
              </div>
            )
          ) : username &&
            (username.includes("admin") || username.includes("canteen")) ? (
            <Link
              to="#"
              style={{ float: "right", paddingRight: "10px" }}
              onClick={() => {
                props.logoutUser({});
                props.history.push("/");
              }}
            >
              <i className="material-icons">power_settings_new</i>
            </Link>
          ) : (
            <img src={image_url} className="small-img" alt="user img" />
          )}

          <div id="status" className="modal bottom-sheet modal-fixed-footer">
            <div className="modal-content">
              <h5>Status</h5>
              {statuses.map((key) => (
                <div
                  key={key}
                  onClick={() => {
                    setFilter((i) => ({ ...i, status: key }));
                  }}
                >
                  {" "}
                  <p className="modal-close">{key}</p>{" "}
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <p className="modal-close btn-flat">Cancel</p>
            </div>
          </div>

          <div id="category" className="modal bottom-sheet modal-fixed-footer">
            <div className="modal-content">
              <h5>Category</h5>
              {categories.map((key) => (
                <div
                  key={key}
                  onClick={() => {
                    setFilter((i) => ({ ...i, category: key }));
                  }}
                >
                  {" "}
                  <p className="modal-close">{key}</p>{" "}
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <p className="modal-close btn-flat">Cancel</p>
            </div>
          </div>
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
        {links.map((key) => (
          <li
            key={key}
            className={
              key.toLowerCase().includes(locationName) ||
              (key.toLowerCase() === "home" && "dashboard" === locationName)
                ? "active"
                : ""
            }
          >
            <Link
              to={
                key.toLowerCase() === "home"
                  ? "/dashboard"
                  : "/" + key.toLowerCase()
              }
            >
              <i className="material-icons">
                {key.toLowerCase() === "recharge"
                  ? "attach_money"
                  : key.toLowerCase()}
              </i>{" "}
              {key}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to="#"
            onClick={() => {
              props.logoutUser({});
              props.history.push("/");
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
