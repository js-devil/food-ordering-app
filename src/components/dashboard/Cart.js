import React, { Component } from "react";
import axios from "axios";
import "../../assets/css/Cart.css";
import { connect } from "react-redux";
import { foodPicked } from "../../store/actions/choices";

import Choice from "../functions/FoodChoice";
import Toast from "../functions/Toast";
import Confirm from "../functions/Confirm";
const Endpoint = `http://localhost:5000`;


class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      orders: [],
      total: 0,
      error: false
    };
  }

  componentDidMount() {
    if (!this.props.choices.length) this.props.history.goBack();
    const total = this.props.choices.reduce((key, i) => key + i.price, 0);

    this.setState({
      orders: this.props.choices.map(key => {
        const { id, name, category } = key;
        return { id, name, category, cost: key.price };
      }),
      total
    });
  }

  checkErrors = error => {
    this.setState({
      error
    });
  };

  getOrder = order => {
    let orders = this.state.orders;
    // find order
    let orderIndex = orders.findIndex(x => x.id === order.id);

    // if order obj is found
    if (orderIndex >= 0) {
      // replace order obj with new order
      orders[orderIndex] = order;
      const total = orders.reduce((key, i) => key + i.cost, 0);
      this.setState({
        orders,
        total
      });
    }
  };

  cancelOrder = async () => {
    let a = Confirm("Are sure you want to cancel this order");
    console.log(a)
    // Confirm
  };

  sendOrder = () => {
    // console.log(this.props.auth);
    if (!this.state.error) {
      if (!Object.keys(this.props.auth).length) {
        Toast("info", "You have to login first");
        return;
      }
      this.postOrder(this.state.orders);
    }
  };

  async login(self, data) {
    try {
      const res = await axios.post(`${Endpoint}/users/login`, data);
      self.props.saveLoginData(res.data);
      Toast("success", "Login Successful");
      self.props.history.push("/");
    } catch (err) {
      self.setState({
        loading: false,
        loadingText: "Login"
      });
    }
  }

  async postOrder(data) {
    try {
      const res = await axios.post(`${Endpoint}/order`, data);
      Toast("success", res.data.status);
      // this.props.history.push("/orders");
    } catch (err) {
      this.setState({
        loading: false
      });
    }
  }

  // methods
  render() {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <table className="striped highlight">
            <thead>
              <tr className="cart-head">
                <th style={{ textAlign: "center" }}>#</th>
                <th>Food</th>
                <th>Cost</th>
              </tr>
            </thead>

            <tbody>
              {this.props.choices.map(key => {
                return (
                  <Choice
                    key={key.id}
                    food={key}
                    no={this.props.choices.findIndex(x => x.id === key.id) + 1}
                    loading={this.state.loading}
                    order={this.getOrder}
                    hasError={this.checkErrors}
                  />
                );
              })}
            </tbody>

            <tfoot>
              <tr className="cart-foot">
                <td colSpan="2">Total</td>
                <td>N{parseFloat(this.state.total).toLocaleString("en")}</td>
              </tr>

              <tr>
                <td colSpan="3">
                  <button
                    onClick={() => this.cancelOrder()}
                    className="btn waves-effect waves-light modal-trigger cancel"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="cart-footer">
          <button onClick={() => this.sendOrder()}>
            <i className="material-icons">near_me</i>
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // return state
  const { choices, auth } = state;
  return {
    choices,
    auth
  };
};

const mapActionsToProps = {
  foodPicked
};

export default connect(mapStateToProps, mapActionsToProps)(Cart);
