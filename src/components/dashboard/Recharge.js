import React, { Component } from "react";

class Recharge extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      token: ""
    };
  }

  handleInput = ({ target }) => {
    console.log(target.id);
    this.setState({
      [target.id]: target.value
    });
  };

  render() {
    return (
      <div className="recharge-page">
        <h5>Your current balance is N7000</h5>

        <input
          id="token"
          disabled={this.state.loading}
          onChange={this.handleInput}
          type="number"
          maxLength="16"
          className="validate"
        />

        <button onClick={() => this.rechargeAccount()}>
          <i className="material-icons">near_me</i>
        </button>
      </div>
    );
  }
}

export default Recharge;
