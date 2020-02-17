import React from "react";
import { Link, withRouter } from "react-router-dom";

const Footer = ({ menuModal, choices, location, changeRange }) => {
  const { pathname } = location;

  // hooks
  const [{ range }, setRange] = React.useState({ range: "Today" });
  React.useEffect(() => {
    changeRange(range);
  }, [range, changeRange]);
  const homeBtn = (
    <Link
      className="home-icon"
      style={{ display: pathname.includes("dashboard") ? "none" : "" }}
      to="/dashboard"
    >
      <i className="material-icons">home</i>{" "}
      <p>
        <span>Home</span>
      </p>
    </Link>
  );

  const caret = <i className="material-icons caret">arrow_drop_down</i>;
  const ranges = ["Today", "This week", "This month"];

  const dateRange = (
    <div id="range" className="modal bottom-sheet modal-fixed-footer">
      <div className="modal-content">
        <h5>Date Range</h5>
        {ranges.map(key => (
          <div
            key={key}
            onClick={() => {
              setRange(i => ({ range: key }));
            }}
          >
            <p className="modal-close">{key}</p>
          </div>
        ))}
      </div>
      <div className="modal-footer">
        <p className="modal-close btn-flat">Cancel</p>
      </div>
    </div>
  );

  return (
    <div
      className="app-bottom"
      style={
        pathname.includes("sign") ||
        pathname.includes("cart") ||
        pathname.includes("recharge") ||
        pathname.includes("settings") ||
        pathname === "/"
          ? { display: "none" }
          : {}
      }
    >
      {homeBtn}
      {dateRange}

      {choices.length || menuModal ? (
        <Link to="/cart" className="cart">
          {choices.length ? (
            <span className="picked_no">{choices.length}</span>
          ) : (
            ""
          )}
          <i className="material-icons">shopping_cart</i>
        </Link>
      ) : (
        <div
          className="waves-effect waves-light modal-trigger range-text"
          href="#range"
        >
          <p>
            {" "}
            {range} {caret}{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default withRouter(Footer);
