import React, { Component } from "react";
import axios from "axios";
import "../../assets/css/Cart.css";
import { connect } from "react-redux";
import { foodPicked } from "../../store/actions/choices";
import { getOrders } from "../../store/actions/orders";

import Choice from "../functions/FoodChoice";
import Toast from "../functions/Toast";
const Endpoint = `http://localhost:5000`;

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      orders: [],
      total: 0,
      foodChoices: [],
      error: false
    };
  }

  componentDidMount() {
    if (!this.props.choices.length) this.props.history.goBack();
    const total = this.props.choices.reduce((key, i) => key + i.price, 0);

    this.setState({
      orders: this.props.choices.map(key => {
        const { id, name, category } = key;
        return { id, name, category, cost: key.price, user_quantity: 1 };
      }),
      foodChoices: this.props.choices,
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

  removeFoodItem = (id) => {
    console.log(id)
    // if (this.state.foodChoices.length) {
    //   this.setState(
    //     {
    //       foodChoices: this.state.foodChoices.filter(key => key.id !== id)
    //     },
    //     () => {
    //       this.props.foodPicked(this.state.foodChoices);
    //     }
    //   );
    // }
  }

  cancelOrder = async () => {
    this.props.history.goBack();
    this.props.foodPicked([]);
    this.setState({
      orders: [],
      total: 0
    });
  };

  sendOrder = () => {
    if (!this.state.error) {
      this.setState({
        loading: true
      });
      this.postOrder(this, {
        order: this.state.orders,
        total: this.state.total
      });
    }
  };

  async postOrder(self, data) {
    try {
      const res = await axios({
        method: "POST",
        url: `${Endpoint}/order`,
        headers: {
          Authorization: `Bearer ${self.props.auth.token}`
        },
        data
      });
      Toast("success", res.data.status);
      await self.props.getOrders(self.props.auth.token);

      self.props.history.push("/");
    } catch (err) {
      self.setState({
        loading: false
      });

      if (err.response.status) {
        Toast("error", String(err.response.data.error));
        return;
      }
      Toast("error", "An error occured!");
    }
  }

  // methods
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
    )

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
              {this.state.foodChoices.map(key => {
                return (
                  <Choice
                    key={key.id}
                    food={key}
                    no={this.state.foodChoices.findIndex(x => x.id === key.id) + 1}
                    order={this.getOrder}
                    hasError={this.checkErrors}
                    removeItem={this.removeFoodItem}
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
                  {!this.state.loading ? (
                    <button
                      onClick={() => this.cancelOrder()}
                      className="btn waves-effect waves-light modal-trigger cancel"
                    >
                      Cancel
                    </button>
                  ) : (
                    ""
                  )}
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

        { this.state.loading ? loader : "" }
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
  foodPicked,
  getOrders
};

export default connect(mapStateToProps, mapActionsToProps)(Cart);
