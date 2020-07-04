import React, { Component } from "react";
import axios from "axios";
import Toast from "../functions/Toast";
import { connect } from "react-redux";
import { saveLoginData } from "../../store/actions/auth";
const Endpoint = `https://food-ordering-system-nan.herokuapp.com`;

class Recharge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      token: "",
      error: "",
    };
  }

  handleInput = ({ target }) => {
    this.setState({
      error: [target.id].length !== 16 ? "Token must have 16 numbers" : "",
      [target.id]: target.value.slice(0, -1),
    });
  };

  validateToken = () => {
    if (this.state.token.length !== 16 || isNaN(this.state.token)) {
      this.setState({
        error: "Token must have 16 numbers",
      });
      return;
    }
    this.setState({
      error: "",
    });
    const { token } = this.state;
    this.setState({
      loading: true,
    });
    // this.rechargeAccount(this, { token });
    console.log(token);
  };

  async rechargeAccount(self, data) {
    try {
      const res = await axios({
        method: "POST",
        url: `${Endpoint}/tokens/load`,
        headers: {
          Authorization: `Bearer ${self.props.auth.token}`,
        },
        data,
      });

      const { balance, status } = res.data;
      await self.props.saveLoginData({ ...self.props.auth, balance });
      Toast("success", status);
      self.props.history.push("/dashboard");
    } catch (err) {
      self.setState({
        loading: false,
      });

      if (!err.response) {
        Toast("error", "Network error!");
        return;
      }
      this.props.catchErrors(err.response);
    }
  }

  render() {
    const loader = (
      <div className="loader">
        <div className="preloader-wrapper big active">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div>
            <div className="gap-patch">
              <div className="circle"></div>
            </div>
            <div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className="recharge-page">
        <h5>Your current balance is N{this.props.auth.balance}</h5>

        {/* <div className="showToken">
          <p>{this.state.token}</p>
        </div> */}
        <input
          id="token"
          disabled={this.state.loading}
          onChange={this.handleInput}
          type="text"
          maxLength={16}
          autoFocus={true}
          className="validate"
          placeholder="Enter token"
        />
        <div className="helper-text">{this.state.error}</div>

        <div className="cart-footer">
          <button onClick={() => this.validateToken()}>
            <i className="material-icons">near_me</i>
          </button>
        </div>

        {this.state.loading ? loader : ""}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // return state
  const { auth } = state;
  return {
    auth,
  };
};

const mapActionsToProps = {
  saveLoginData,
};

export default connect(mapStateToProps, mapActionsToProps)(Recharge);
