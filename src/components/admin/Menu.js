import React, { Component } from "react";

import { connect } from "react-redux";
import { foodPicked } from "../../store/actions/choices";
import { getMenu } from "../../store/actions/menu";
import "../../assets/css/Menu.css";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
  foodPicked,
  getMenu
};

export default connect(mapStateToProps, mapActionsToProps)(Menu);
