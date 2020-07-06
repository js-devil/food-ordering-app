import React from "react";
import "../../assets/css/None.css";
import history from "../../history";

class None extends React.Component {
  componentDidMount() {
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      history.push("/");
    }
  }

  render() {
    return (
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h3>Oops! This device is not supported</h3>
            <h1>
              <span>4</span>
              <span>2</span>
              <span>2</span>
            </h1>
          </div>
          <h2>
            we are sorry, but you can only access the app with a mobile device
          </h2>
        </div>
      </div>
    );
  }
}

export default None;
