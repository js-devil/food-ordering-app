import React from "react";
import { Link, withRouter } from "react-router-dom";

const Footer = props => {
  const homeBtn = (
    <Link className="home-icon" to="/dashboard">
      <i className="material-icons">home</i>{" "}
      <p>
        <span>Home</span>
      </p>
    </Link>
  );

  const { pathname } = props.location;

  return (
    <div
      className="app-bottom"
      style={
        pathname.includes("sign") ||
        pathname.includes("cart") ||
        pathname.includes("recharge") ||
        pathname === "/"
          ? { display: "none" }
          : {}
      }
    >
      {homeBtn}

      {props.choices.length ? (
        <Link to="/cart" className="cart">
          <span className="picked_no">{props.choices.length}</span>
          <i className="material-icons">shopping_cart</i>
        </Link>
      ) : (
        <Link to="#!" className="cart">
          <i className="material-icons">shopping_cart</i>
        </Link>
      )}
    </div>
  );
};

export default withRouter(Footer);
