import React from "react";
import { Link, withRouter } from "react-router-dom";

const Footer = props => {
  const homeBtn = (
    <Link className="home-icon" to="/">
      <i className="material-icons">home</i>{" "}
      <p>
        <span>Home</span>
      </p>
    </Link>
  );

  return (
    <div
      className="app-bottom"
      style={
        props.location.pathname.includes("sign") ||
        props.location.pathname.includes("cart")
          ? { display: "none" }
          : {}
      }
    >
      {homeBtn}

      <Link to="/cart" className="cart">
        <span className="picked_no">
          {props.choices.length ? props.choices.length : ""}
        </span>
        <i className="material-icons">shopping_cart</i>
      </Link>
    </div>
  );
};

export default withRouter(Footer);
