import React, { Component } from "react";
import "../../assets/css/Settings.css";

import { connect } from "react-redux";
import { saveLoginData } from "../../store/actions/auth";

import ChangePassword from "../functions/ChangePassword";
import ChangeAvatar from "../functions/ChangeAvatar";
import Faq from "./faq";

class Settings extends Component {
  componentDidMount() {
    new Faq();
  }
  render() {
    const change = (
      <>
        <span className="minus">
          <i className="material-icons">close</i>
        </span>
        <span className="plus">
          <i className="material-icons">chevron_right</i>
        </span>
      </>
    );
    return (
      <div className="settings-page">
        <div className="faq__item">
          <div className="faq__header">
            <span>Change Password</span>
            {change}
          </div>
          <div className="faq__content gen__text">
            <ChangePassword
              auth={this.props.auth}
              catchErrors={this.props.catchErrors}
            />
          </div>
        </div>

        <div className="faq__item">
          <div className="faq__header">
            <span>Change Avatar</span>
            {change}
          </div>
          <div className="faq__content gen__text">
            <ChangeAvatar
              auth={this.props.auth}
              catchErrors={this.props.catchErrors}
              saveLoginData={this.props.saveLoginData}
            />
          </div>
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

const actions = {
  saveLoginData
};

export default connect(map, actions)(Settings);
