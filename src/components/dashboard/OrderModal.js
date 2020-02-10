import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import { connect } from "react-redux";
import { getOrders } from "../../store/actions/orders";

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
      showCancel: true,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.order.id !== prevProps.order.id) {
      M.Modal.init(this.Modal, options);
      let instance = M.Modal.getInstance(this.Modal);
      if (this.props.visible) instance.open();
    }
  }

  componentDidMount() {
    M.Modal.init(this.Modal, options);
    let instance = M.Modal.getInstance(this.Modal);
    if (this.props.visible) instance.open();
  }

  reOrder = async id => {
    console.log(id);
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
        Toast("success", "This order has been cancelled");
        await this.props.getOrders(res.data.token);
        this.setState({
          showCancel: false,
          loading: false
        })
      }
    } catch (err) {
      this.setState({
        loading: false
      });

      if (err.response.status === 400) {
        Toast("error", String(err.response.data.error));
        return;
      }
      Toast("error", "An error occured!");
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
        <p>Getting Menu...</p>
      </div>
    );

    return (
      <>
        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
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
            {completed === null || this.state.showCancel===true ? (
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
  const { auth } = state;
  return {
    auth
  };
};

const actions = {
  getOrders
};

// export default connect(mapStateToProps, mapAc)(Modal);
export default connect(map, actions)(Modal);
