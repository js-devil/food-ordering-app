import React, { Component } from "react";
import { connect } from "react-redux";
import { foodPicked } from "../../store/actions/choices";

import FoodItem from "../functions/FoodList";
import "../../assets/css/Dashboard.css";
import think from "../../assets/img/think.png";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: true,
      foodChoices: []
    };
  }

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

  render() {
    const MenuList = (
      <div className="row menu-list">
        {this.props.menu.map(key => (
          <FoodItem pickFood={this.pickFoodItem} key={key.id} food={key} />
        ))}
      </div>
    );

    const OrderList = <div className="row order-list"></div>;
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-content">
            <div>
              <h5>Hi, {this.props.auth.username} nan</h5>
              <p>What do we eat today?</p>
            </div>
            <div>
              <img src={think} alt="think" />
            </div>
          </div>
          <div
            className="dashboard-card"
            onClick={() => this.setState({ showMenu: !this.state.showMenu })}
          >
            <p>Menu</p>
            <hr />
            <p>Orders</p>
          </div>
        </div>

        <div>{/* MenuList */}</div>
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
  foodPicked
};

export default connect(mapStateToProps, mapActionsToProps)(Home);
