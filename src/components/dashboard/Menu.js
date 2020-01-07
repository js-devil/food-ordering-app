import React, { Component } from "react";

import { connect } from "react-redux";
import { getMenu } from "../../store/actions/menu";
import { foodPicked } from "../../store/actions/choices";

import FoodItem from "../functions/FoodItem";
import "../../assets/css/Menu.css";
import sadface from "../../assets/img/sad-face.png";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      category: "Category",
      status: "Status",
      foodChoices: []
    };
  }

  componentDidMount() {
    this.props.getMenu(this);
  }

  changeStatus = status => {
    this.setState({
      menu: this.props.menu.filter(key =>
        key.status.toLowerCase()===(status.toLowerCase())
      ),
      status
    });
  };

  changeCategory = category => {
    this.setState({
      menu:
        category !== "All"
          ? this.props.menu.filter(key =>
              key.category.toLowerCase().includes(category.toLowerCase())
            )
          : this.props.menu,
      category
    });
  };

  pickFoodItem = item => {
    let findItem = this.state.foodChoices.filter(key => key.id === item.id);
    if (findItem.length) {
      this.setState({
        foodChoices: this.state.foodChoices.filter(key => key.id !== item.id)
      }, () => {
        this.props.foodPicked(this.state.foodChoices);
      });
    } else {
      this.setState({
        foodChoices: [...this.state.foodChoices, item]
      }, () => {
        this.props.foodPicked(this.state.foodChoices);
      });
    }
  };

  render() {
    const caret = <i className="material-icons caret">arrow_drop_down</i>;
    const categories = [
      "All",
      "Rice",
      "Yam",
      "Beans",
      "Swallow",
      "Others",
      "Drinks",
      "Specials"
    ];
    const statuses = ["Available", "Unavailable"];

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
        <p>Getting Menu...</p>
      </div>
    );

    const menuList = this.state.menu.map(key => (
      <FoodItem pickFood={this.pickFoodItem} key={key.id} food={key} choices={this.props.choices} />
    ));

    const noMenu = (
      <div className="none">
        <img src={sadface} alt="No food" />
        <p>
          {this.state.category === "All" && this.state.status === "Available"
            ? "Food is not ready yet!"
            : "Food under this category is finished or not ready"}
        </p>
        ;
      </div>
    );

    return (
      <div className="food-menu">
        <div className="card-panel menu-card">
          <p className="waves-effect waves-light modal-trigger" href="#status">
            {this.state.status} {caret}
          </p>

          <p
            className="waves-effect waves-light modal-trigger"
            href="#category"
          >
            {this.state.category ? this.state.category : "All"} {caret}
          </p>
        </div>

        {/* <!-- Modal Structure --> */}
        <div id="status" className="modal bottom-sheet modal-fixed-footer">
          <div className="modal-content">
            <h5>Status</h5>
            {statuses.map(key => (
              <div key={key} onClick={() => this.changeStatus(key)}>
                {" "}
                <p className="modal-close">{key}</p>{" "}
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <p className="modal-close btn-flat">Cancel</p>
          </div>
        </div>

        <div id="category" className="modal bottom-sheet modal-fixed-footer">
          <div className="modal-content">
            <h5>Category</h5>
            {categories.map(key => (
              <div key={key} onClick={() => this.changeCategory(key)}>
                {" "}
                <p className="modal-close">{key}</p>{" "}
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <p className="modal-close btn-flat">Cancel</p>
          </div>
        </div>

        <div className="menu-list">
          {this.props.menuLoading
            ? loader
            : this.props.menu.length
            ? menuList
            : noMenu}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // return state
  const { menu, menuLoading, choices } = state;
  return {
    menu,
    menuLoading,
    choices
  };
};

const mapActionsToProps = {
  getMenu,
  foodPicked
};

export default connect(mapStateToProps, mapActionsToProps)(Menu);
