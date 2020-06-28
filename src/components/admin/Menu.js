import React, { Component } from "react";
import { connect } from "react-redux";
import { getMenu } from "../../store/actions/menu";

import EditMenu from "./EditMenu";

import "../../assets/css/Admin.css";
import sadface from "../../assets/img/sad-face.png";

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      item: {},
      menu: this.props.menu || [],
      loading: false,
      searchText: "",
    };
  }

  async componentDidMount() {
    if (this.props.menu.length)
      return await this.setState({
        menu: this.props.menu.filter((key) => key.quantity !== 0),
      });

    this.setState(
      {
        loading: true,
      },
      async () => await this.props.getMenu(this)
    );
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.category.toLowerCase() !== prevProps.category.toLowerCase()
    ) {
      this.setState({
        menu:
          this.props.category !== "All"
            ? this.props.menu
                .filter((key) => key.quantity !== 0)
                .filter((key) =>
                  key.category
                    .toLowerCase()
                    .includes(this.props.category.toLowerCase())
                )
            : this.props.menu.filter((key) => key.quantity !== 0),
      });
    }
  }

  handleSearch = ({ value }) => {
    this.setState({
      menu: this.props.menu.filter((key) =>
        key.name.toLowerCase().includes(value.toLowerCase())
      ),
    });
  };

  selectItem = (id) => {
    const item = this.props.menu.find((key) => key.id === id) || {};

    this.setState({
      item,
      showModal: true,
    });
  };

  updateMenu = (menu, id) => {
    this.setState(
      {
        menu,
      },
      () => id && this.selectItem(id)
    );
  };

  closeModal = (val) => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    const { menu } = this.state;
    const Naira = <span>&#8358;</span>;

    const noMenu = (
      <div className="no-orders">
        <img src={sadface} alt="no orders" />
        <p>There are no items on the menu yet</p>
        <button onClick={(e) => this.selectItem(0)} className="btn btn-flat">
          Add Item
        </button>
      </div>
    );

    const menuList = (
      <table className="body striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>
              <span
                className="add-item flex"
                onClick={(e) => this.selectItem(0)}
              >
                <i className="material-icons">add_circle_outline</i> Add Item
              </span>
            </th>
          </tr>
        </thead>

        <tbody>
          {menu.map((key) => (
            <tr key={key.id}>
              <td>{key.name}</td>
              <td>
                {Naira} {key.price}
              </td>
              <td>{key.quantity}</td>
              <td>
                <button
                  className="btn waves-effect waves-light colored"
                  onClick={(e) => this.selectItem(key.id)}
                >
                  View
                  {/* <i class="material-icons right">send</i> */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
    return (
      <div className="menu">
        <div className="head">
          <h4>Based on today</h4>
          <input
            type="text"
            id="searchText"
            placeholder="Search..."
            onInput={(e) => this.handleSearch(e.target)}
          />
        </div>

        {this.state.loading ? (
          <div>Loading...</div>
        ) : this.state.menu.length ? (
          menuList
        ) : (
          noMenu
        )}

        {this.state.showModal && (
          <EditMenu
            item={this.state.item}
            closeModal={this.closeModal}
            updateMenu={this.updateMenu}
            visible={this.state.showModal}
            catchErrors={this.props.catchErrors}
          />
        )}
      </div>
    );
  }
}

const map = (state) => {
  const { auth, menu } = state;
  return {
    auth,
    menu,
  };
};

const actions = {
  getMenu,
};

export default connect(map, actions)(Orders);
