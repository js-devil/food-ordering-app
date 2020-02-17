import React, { Component } from "react";
import { connect } from "react-redux";
import { foodPicked } from "../../store/actions/choices";
import { getOrders } from "../../store/actions/orders";

import FoodItem from "../functions/FoodList";
import Order from "../functions/Order";
import OrderModal from "./OrderModal";
import "../../assets/css/Dashboard.css";
import think from "../../assets/img/think.png";
import sadface from "../../assets/img/sad-face.png";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: true,
      showModal: false,
      menu: [],
      orders: [],
      order: {},
      foodChoices: []
    };
  }

  componentDidMount() {
    this.setState({
      menu: this.props.menu.filter(key => key.quantity !== 0),
      orders: this.props.orders
    });

    if(Object.keys(this.props.auth).length && this.props.auth.token) {
      setInterval(() => {
        this.props.getOrders(this.props.auth.token, this);
      }, 60000);
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.orders.length !== prevProps.orders.length) {
      this.updateOrders(this.props.orders)
    }
    if (
      this.props.category.toLowerCase() !== prevProps.category.toLowerCase()
    ) {
      this.setState({
        menu:
          this.props.category !== "All"
            ? this.props.menu.filter(key => key.quantity !== 0)
            .filter(key =>
                key.category
                  .toLowerCase()
                  .includes(this.props.category.toLowerCase())
              )
            : this.props.menu.filter(key => key.quantity !== 0),
        // foodChoices: []
      }, () => {
        // this.props.foodPicked([]);
      });
    }

    if(
      this.props.dateRange.toLowerCase() !== prevProps.dateRange.toLowerCase()
    ) {
      console.log(this.props.dateRange)
      // this.setState({
      //   orders: 
      //   // this.props.category
      // })
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
            ? this.props.orders.filter(key => key.completed === status)
            : this.props.orders,
        // foodChoices: []
      }, () => {
        // this.props.foodPicked([]);
      });
    }
  }

  updateOrders = orders => {
    this.setState({
      orders
    });
  };

  pickFoodItem = item => {
    let findItem = this.state.foodChoices.filter(key => key.id === item.id);
    if (findItem.length) {
      this.setState(
        {
          foodChoices: this.state.foodChoices.filter(key => key.id !== item.id)
        },
        () => {
          this.props.foodPicked(this.state.foodChoices);
        }
      );
    } else {
      this.setState(
        {
          foodChoices: [...this.state.foodChoices, item]
        },
        () => {
          this.props.foodPicked(this.state.foodChoices);
        }
      );
    }
  };

  getOrder = order => {
    this.setState({
      order,
      showModal: Object.keys(order).length ? true : false
    });
  };

  render() {
    const MenuList = this.state.menu.length ? (
      this.state.menu.map(key => (
        <FoodItem pickFood={this.pickFoodItem} key={key.id} food={key} />
      ))
    ) : (
      <div className="none">
        <img src={sadface} alt="No food" />
        <p>
          {this.props.category === "All"
            ? "Food is not ready yet!"
            : "Food under this category is finished or not ready"}
        </p>
        ;
      </div>
    );

    const OrderList = this.state.orders.length ? (
      <table className="striped highlight">
        <thead>
          <tr className="order-heading">
            <th style={{ width: "70%" }}>Food</th>
            <th style={{ width: "10%" }}>Cost</th>
            <th style={{ width: "20%" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.state.orders.map(key => (
            <Order catchErrors={this.props.catchErrors} sendOrder={this.getOrder} order={key} key={key.id} />
          ))}
        </tbody>
      </table>
    ) : (
      <div className="no-orders">
        {!this.props.orders.length ? (
          <p>You have no orders yet</p>
        ) : (
          <p>You have no {this.props.status.toLowerCase()} orders</p>
        )}
      </div>
    );
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-content">
            <div>
              <h5>Hi, {this.props.auth.username}</h5>
              <p>What do we eat today?</p>
            </div>
            <div>
              <img src={think} alt="think" />
            </div>
          </div>
          <div className="dashboard-card">
            <p
              onClick={() => {
                this.setState({ showMenu: true });
                this.props.switch(true);
              }}
            >
              Menu
            </p>
            <hr />
            <p
              onClick={() => {
                this.setState({ showMenu: false });
                this.props.switch(false);
              }}
            >
              Orders
            </p>
          </div>
        </div>

        <div className="row home-list">
          {this.state.showModal ? (
            <OrderModal
              visible={this.state.showModal}
              order={this.state.order}
              updateStateOrders={this.updateOrders}
              sendOrder={this.getOrder}
              catchErrors={this.props.catchErrors} 
            />
          ) : (
            ""
          )}
          {this.state.showMenu ? (
            MenuList
          ) : (
            <div style={{ padding: "15px" }}>{OrderList}</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { menu, orders, auth, menuLoading, choices } = state;
  return {
    orders,
    menu,
    auth,
    menuLoading,
    choices
  };
};

const mapActionsToProps = {
  foodPicked,
  getOrders
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
