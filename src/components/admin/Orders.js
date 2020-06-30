import React, { Component } from "react";
import { connect } from "react-redux";
import { getOrders } from "../../store/actions/orders";

import OrderModal from "../dashboard/OrderModal";
import Order from "../functions/admin/Order";

import "../../assets/css/Admin.css";
import sadface from "../../assets/img/sad-face.png";

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      order: {},
      orders: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.setState(
      {
        orders: this.props.orders.filter((key) => key.completed === null),
      },
      () => this.setState({ loading: false })
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.orders.length !== prevProps.orders.length) {
      this.updateOrders(this.props.orders);
    }

    if (this.props.status.toLowerCase() !== prevProps.status.toLowerCase()) {
      const status = this.props.status.toLowerCase().includes("pending")
        ? null
        : this.props.status.toLowerCase().includes("completed")
        ? 1
        : 0;
      this.setState({
        orders:
          this.props.status !== "Status"
            ? this.props.orders.filter((key) => key.completed === status)
            : this.props.orders,
      });
    }
  }

  updateOrders = (orders) => {
    const status = this.props.status.toLowerCase().includes("pending")
      ? null
      : this.props.status.toLowerCase().includes("completed")
      ? 1
      : 0;
    this.setState({
      orders: orders.filter((key) => key.completed === status),
    });
  };

  getOrder = (order) => {
    if (order.completed === null) {
      this.setState({
        order,
        showModal: Object.keys(order).length ? true : false,
      });
      return;
    }
    this.setState({
      showModal: false,
    });
  };

  handleInput = ({ target }) => {
    const status = this.props.status.toLowerCase().includes("pending")
      ? null
      : this.props.status.toLowerCase().includes("completed")
      ? 1
      : 0;
    let filter = target.value.toLowerCase();
    this.setState({
      orders: this.props.orders.filter(
        (key) =>
          key.completed === status &&
          (key.username.toLowerCase().includes(filter) ||
            key.user_order.toLowerCase().includes(filter))
      ),
    });
  };

  closeModal = (val) => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const noOrders = (
      <div className="no-orders">
        <img src={sadface} alt="no orders" />
        <p>No one has made any orders so far</p>
      </div>
    );

    const ordersView = this.state.orders.length
      ? this.state.orders.map((key) => (
          <Order key={key.id} order={key} sendOrder={this.getOrder} />
        ))
      : noOrders;
    return (
      <div className="orders">
        <div className="head">
          <h4>Based on today</h4>
          <input
            type="text"
            placeholder="Search..."
            onInput={(e) => this.handleInput(e)}
          />
        </div>

        <div className="body">
          {this.state.loading || !this.state.orders.length
            ? "Loading..."
            : ordersView}
        </div>

        {this.state.showModal ? (
          <OrderModal
            visible={this.state.showModal}
            order={this.state.order}
            updateStateOrders={this.updateOrders}
            closeModal={this.closeModal}
            sendOrder={this.getOrder}
            catchErrors={this.props.catchErrors}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

const map = (state) => {
  const { auth, orders } = state;
  return {
    auth,
    orders,
  };
};

const actions = {
  getOrders,
};

export default connect(map, actions)(Orders);
