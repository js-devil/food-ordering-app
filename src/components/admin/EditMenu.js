import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import { connect } from "react-redux";
import { storeMenuData } from "../../store/actions/menu";

import EditItem from "../functions/admin/EditItem";

import axios from "axios";
import Toast from "../functions/Toast";

const options = {
  inDuration: 250,
  outDuration: 250,
  opacity: 0.5,
  dismissible: false,
  startingTop: "10%",
  endingTop: "10%",
};

// instance.close();
// instance.destroy();

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showEdit: Object.values(this.props.item).length ? false : true,
      showDelete: false,
    };
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
    this.props.closeModal(false);
  };

  addItem = async (data) => {
    try {
      const res = await axios({
        method: "POST",
        url: `http://localhost:5000/menu`,
        headers: {
          Authorization: `Bearer ${this.props.auth.token}`,
        },
        data,
      });

      if (res.status === 200) {
        const { status, item } = res.data;

        const menu = [...this.props.menu, item];
        await this.props.storeMenuData(menu);
        this.props.updateMenu(menu);

        this.setState(
          {
            loading: false,
          },
          () => {
            Toast("success", status);
            this.closeModal();
          }
        );
      }
    } catch (err) {
      this.setState({
        loading: false,
      });
      if (!err.response) {
        Toast("error", "Network error!");
        return;
      }

      this.props.catchErrors(err.response);
    }
  };

  submitPayload = async (data, id) => {
    this.setState({
      loading: true,
    });

    if (!id) return this.addItem(data);

    let item = this.props.menu.find((key) => key.id === id);

    try {
      const res = await axios({
        method: "PUT",
        url: `http://localhost:5000/menu/${id}/update`,
        headers: {
          Authorization: `Bearer ${this.props.auth.token}`,
        },
        data,
      });

      if (res.status === 200) {
        const menu = [
          ...this.props.menu.filter((key) => key.id !== id),
          { ...item, ...data },
        ];
        await this.props.storeMenuData(menu);
        this.props.updateMenu(menu, id);

        this.setState({ showEdit: false });

        // this.closeModal();

        const { status } = res.data;
        this.setState(
          {
            loading: false,
          },
          () => {
            Toast("success", status);
          }
        );
      }
    } catch (err) {
      this.setState({
        loading: false,
      });
      if (!err.response) {
        Toast("error", "Network error!");
        return;
      }

      this.props.catchErrors(err.response);
    }
  };

  deleteItem = async (id) => {
    this.setState({
      loading: true,
    });
    try {
      const res = await axios({
        method: "DELETE",
        url: `http://localhost:5000/menu/${id}`,
        headers: {
          Authorization: `Bearer ${this.props.auth.token}`,
        },
      });

      if (res.status === 200) {
        const menu = this.props.menu.filter((key) => key.id !== id);

        await this.props.storeMenuData(menu);
        this.props.updateMenu(menu);

        const { status } = res.data;
        this.setState(
          {
            loading: false,
            showDelete: false,
          },
          () => {
            Toast("success", status);
            this.closeModal();
          }
        );
      }
    } catch (err) {
      this.setState({
        loading: false,
      });
      if (!err.response) {
        Toast("error", "Network error!");
        return;
      }

      this.props.catchErrors(err.response);
    }
  };

  render() {
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
    const { item } = this.props;

    return (
      <>
        <div
          ref={(Modal) => {
            this.Modal = Modal;
          }}
          id="modal1"
          className={this.state.loading ? "modal blur  " : "modal"}
        >
          <i
            className="material-icons close"
            onClick={(e) =>
              this.state.showEdit && Object.values(item).length
                ? this.setState({ showEdit: false })
                : this.closeModal()
            }
          >
            clear
          </i>
          {!this.state.showEdit ? (
            <>
              <div className="modal-content">
                <h5> {item.name} </h5>
                {this.state.loading ? loader : ""}

                {Object.keys(item)
                  .filter((i) => i.toLowerCase()[0] !== "i")
                  .map((i) => (
                    <div className="flex" key={i}>
                      <p style={{ textTransform: "capitalize" }}>
                        {String([i]).replace("_", " ")}:
                      </p>
                      <p>{item[i]}</p>
                    </div>
                  ))}

                {this.state.showDelete && (
                  <div className="delete">
                    <p>Are you sure you want to delete this food item?</p>
                    <div>
                      <button
                        onClick={(e) => this.deleteItem(item.id)}
                        className="waves-effect btn-flat red"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => this.setState({ showDelete: false })}
                        className="waves-effect btn-flat"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => this.setState({ showEdit: true })}
                  className="waves-effect btn-flat"
                >
                  Edit
                </button>

                <button
                  onClick={() => this.setState({ showDelete: true })}
                  className="waves-effect btn-flat"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              {this.state.loading ? loader : ""}
              <EditItem item={item} submit={this.submitPayload} />
            </>
          )}
        </div>
      </>
    );
  }
}

const map = (state) => {
  const { menu, auth } = state;
  return {
    auth,
    menu,
  };
};

const actions = {
  storeMenuData,
};

// export default connect(mapStateToProps, mapAc)(Modal);
export default connect(map, actions)(Modal);
