import React, { Component } from "react";
import "../../assets/css/Settings.css";
import ChangePassword from "../functions/ChangePassword";
import { connect } from "react-redux";
import ChangeAvatar from "../functions/ChangeAvatar";

class Settings extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="settings-page">
        <ul class="collapsible">
          <li>
            <div class="collapsible-header"><i class="material-icons">filter_drama</i>Change Avatar</div>
            <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
          <li>
            <div class="collapsible-header"><i class="material-icons">place</i>Change Password</div>
            <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
          <li>
            <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
            <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
          </li>
        </ul>
        <div className="settings"></div>
        <div className="settings"></div>

        <ChangePassword
          auth={this.props.auth}
          catchErrors={this.props.catchErrors}
        />
        <ChangeAvatar />
      </div>
    );
  }
}

const map = state => {
  const { auth } = state
  return {
    auth
  }
}

export default connect(map)(Settings);
