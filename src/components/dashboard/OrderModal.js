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
      this.openModal();
    }
  }

  componentDidMount() {
    this.openModal();
  }

  openModal = () => {
    M.Modal.init(this.Modal, options);
    let instance = M.Modal.getInstance(this.Modal);
    instance.open();
  };

  closeModal = () => {
    M.Modal.init(this.Modal, options);
    let instance = M.Modal.getInstance(this.Modal);
    instance.close();
  };

  reOrder = async id => {
    let { balance, token, username } = this.props.auth;
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
      // await this.props.sendOrder({});
      this.closeModal();
      await this.props.getOrders(token, this, username);
      this.setState(
        {
          loading: false
        },
        () => {
          Toast("success", status);
        }
      );
    } catch (err) {
      this.setState({
        loading: false
      });

      if (!err.response) {
        Toast("error", "Network error!");
        return;
      }
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
      this.setState({
        loading: false
      });
      if (!err.response) {
        Toast("error", "Network error!");
        return;
      }

      this.props.catchErrors(err.response);
    }
  };

  completeOrder = async id => {
    this.setState({
      loading: true
    });
    try {
      const res = await axios({
        method: "POST",
        url: `http://localhost:5000/order/${id}/answer`,
        headers: {
          Authorization: `Bearer ${this.props.auth.token}`
        },
        data: {}
      });

      if (res.status === 200) {
        let order = this.props.orders.find(key => key.id === id);
        order.completed = 1;
        let orders = [...this.props.orders.filter(key => key.id !== id), order];
        await this.props.updateOrders(orders);
        await this.props.updateStateOrders(orders);
        this.closeModal();

        const { status } = res.data;
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
      this.setState({
        loading: false
      });
      if (!err.response) {
        Toast("error", "Network error!");
        return;
      }

      this.props.catchErrors(err.response);
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

    const { username } = this.props.auth;

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

    const reorderBtn = (
      <button
        onClick={() => this.reOrder(id)}
        className="waves-effect waves-green btn-flat"
      >
        Re-order
      </button>
    );

    const cancelBtn =
      completed === null ? (
        <button
          onClick={() => this.cancelOrder(id)}
          className="waves-effect waves-red btn-flat"
        >
          Cancel
        </button>
      ) : (
        ""
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
          {username.includes("admin") || username.includes("canteen") ? (
            <div className="modal-footer">
              <button
                onClick={() => this.completeOrder(id)}
                className="waves-effect waves-green btn-flat"
              >
                Complete
              </button>
            </div>
          ) : (!username.includes("admin") || !username.includes("canteen")) &&
            completed === null ? (
            <div className="modal-footer">
              {cancelBtn}
              {reorderBtn}
            </div>
          ) : (
            <div className="modal-footer">{reorderBtn}</div>
          )}
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
