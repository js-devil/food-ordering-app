import React, { Component } from "react";
import { connect } from "react-redux";
import "../../assets/css/Menu.css"

class Home extends Component {
  render() {
    const links = [
      {
        name: "Orders",
        img: "https://miro.medium.com/max/1000/1*rxUhxYOSBh2txS8KdMWZ9A.jpeg"
      },
      {
        name: "Menu",
        img:
          "https://dfjc3etzov2zz.cloudfront.net/wp-content/uploads/2016/11/Feature-Thanksgiving-modern-classics-1200x800-1024x683.jpg"
      },
      {
        name: "Tokens",
        img: "https://previews.123rf.com/images/sheilaf2002/sheilaf20021902/sheilaf2002190200645/116310825-plate-with-fork-upside-down-indicating-finished-with-meal-mug-beside-bill-receipt-on-plate-with-sugg.jpg"
      }
    ];

    return (
      <div className="admin-menu">
        <h4>Based on what is available</h4>
        <div className="menu-list">
          {links.map(({ name, img }) => (
            <div
              key={name}
              className="admin-link"
              style={{ backgroundImage: "url(" + img + ")" }}
              onClick={() => {
                this.props.history.push(`/${name.toLowerCase()}`);
              }}
            >
              <div className="food-content">
                <h5>{name}</h5>
                <button>Choose</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const map = state => {
  const { auth } = state;
  return {
    auth
  };
};
export default connect(map)(Home);
