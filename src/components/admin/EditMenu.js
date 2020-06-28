import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import { connect } from "react-redux";
import {} from "../../store/actions/menu";
// import { saveLoginData } from "../../store/actions/auth";

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
      showEdit: false,
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
            onClick={(e) => this.closeModal()}
          >
            clear
          </i>
          {!this.state.showEdit ? (
            <>
              <div className="modal-content">
                <h5> {item.name} </h5>
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
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => this.setState({ showEdit: true })}
                  className="waves-effect btn-flat"
                >
                  Edit
                </button>

                <button
                  onClick={() => this.deleteItem(item.id)}
                  className="waves-effect btn-flat"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="modal-content">
                <EditItem item={item} />
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => this.setState({ showEdit: false })}
                  className="waves-effect btn-flat"
                >
                  Update
                </button>
              </div>
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

const actions = {};

// export default connect(mapStateToProps, mapAc)(Modal);
export default connect(map, actions)(Modal);
