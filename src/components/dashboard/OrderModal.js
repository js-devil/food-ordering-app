import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import { connect } from "react-redux";
import { getOrders, updateOrders } from "../../store/actions/orders";
import { saveLoginData } from "../../store/actions/auth";

import axios from "axios";
import Toast from "../functions/Toast";

const options = {
  inDuration: 250,
  outDuration: 250,
  opacity: 0.5,
  dismissible: true,
  startingTop: "4%",
  endingTop: "10%"
};

// instance.close();
// instance.destroy();

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showCancel: true
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.order.id !== prevProps.order.id) {
      M.Modal.init(this.Modal, options);
      let instance = M.Modal.getInstance(this.Modal);
      if (this.props.visible) instance.open();
      else instance.close();
    }
  }

  componentDidMount() {
    M.Modal.init(this.Modal, options);
    let instance = M.Modal.getInstance(this.Modal);
    if (this.props.visible) instance.open();
  }

  reOrder = async id => {
    let { balance, token } = this.props.auth;
    this.setState({
      loading: true
    });

    try {
      const res = await axios({
        method: "POST",
        url: `http://localhost:5000/order/${id}/reorder`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { balance }
      });
      let { status } = res.data;
      balance = res.data.balance;
      await this.props.saveLoginData({ ...this.props.auth, balance });
      await this.props.sendOrder({});
      await this.props.getOrders(token, this);
      this.setState(
        {
          loading: false
        },
        () => {
          Toast("success", status);
        }
      );
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false
      });

      this.props.catchErrors(err.response);
    }
  };

  cancelOrder = async id => {
    this.setState({
      loading: true
    });
    try {
      const res = await axios({
        method: "POST",
        url: `http://localhost:5000/order/${id}/cancel`,
        headers: {
          Authorization: `Bearer ${this.props.auth.token}`
        },
        data: {}
      });

      if (res.status === 200) {
        let order = this.props.orders.find(key => key.id === id);
        order.completed = 0;
        let orders = [...this.props.orders.filter(key => key.id !== id), order];
        await this.props.updateOrders(orders);
        await this.props.updateStateOrders(orders);
        await this.props.sendOrder(order);
        const { balance, status } = res.data;
        await this.props.saveLoginData({ ...this.props.auth, balance });
        this.setState(
          {
            loading: false
          },
          () => {
            Toast("success", status);
          }
        );
      }
    } catch (err) {
      console.log(err);
      this.setState({
        loading: false
      });

      this.props.catchErrors(err.response);

      // if (err.response.status === 400) {
      //   Toast("error", String(err.response.data.error));
      //   return;
      // }
      // Toast("error", "An error occured!");
    }
  };

  render() {
    const {
      id,
      user_order,
      total,
      completed,
      time_of_order
    } = this.props.order;

    const loader = (
      <div className="loader">
        <div className="preloader-wrapper active">
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
      <>
        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className={this.state.loading ? "modal blur  " : "modal"}
        >
          <div className="modal-content">
            <h5> Food Order </h5>
            {JSON.parse(user_order).map(key => (
              <div className="flex no-border" key={key.id}>
                <p>{key.name}</p>
                <p>{key.cost}</p>
              </div>
            ))}
            <div className="flex">
              <p>Total Cost</p>
              <p>
                <span>&#8358;</span>
                {total}
              </p>
            </div>

            {this.state.loading ? loader : ""}

            <div className="flex">
              <p>Status:</p>
              <p>
                {completed == null
                  ? "PENDING"
                  : completed
                  ? "COMPLETED"
                  : "CANCELLED"}
              </p>
            </div>
            <div className="flex">
              <p>Date:</p>
              <p>{time_of_order}</p>
            </div>
          </div>
          <div className="modal-footer">
            {completed === null ? (
              <button
                onClick={() => this.cancelOrder(id)}
                className="waves-effect waves-red btn-flat"
              >
                Cancel
              </button>
            ) : (
              ""
            )}
            <button
              onClick={() => this.reOrder(id)}
              className="waves-effect waves-green btn-flat"
            >
              Re-order
            </button>
          </div>
        </div>
      </>
    );
  }
}

const map = state => {
  const { orders, auth } = state;
  return {
    auth,
    orders
  };
};

const actions = {
  updateOrders,
  saveLoginData,
  getOrders
};

// export default connect(mapStateToProps, mapAc)(Modal);
export default connect(map, actions)(Modal);
