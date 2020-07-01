import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "axios";
import Toast from "../functions/Toast";
import AddToken from "../functions/admin/AddToken";

import "../../assets/css/Admin.css";
import sadface from "../../assets/img/sad-face.png";

class Token extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tokens: [],
      filteredTokens: [],
      loading: true,
      showAdd: false,
    };
  }

  componentDidMount() {
    this.getAllTokens();
  }

  componentDidUpdate(prevProps) {
    if (this.props.used !== prevProps.used) {
      this.setState({
        filteredTokens: this.state.tokens.filter(
          (key) => Boolean(key.available) !== this.props.used
        ),
      });
    }
  }

  handleSearch = ({ value }) => {
    this.setState({
      filteredTokens: this.state.tokens
        .filter(
          (key) =>
            String(key.amount).toLowerCase().includes(value.toLowerCase()) ||
            String(key.username || "")
              .toLowerCase()
              .includes(value.toLowerCase())
        )
        .filter((key) => Boolean(key.available) !== this.props.used),
    });
  };

  getAllTokens = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `https://food-ordering-system-nan.herokuapp.com/tokens`,
        headers: {
          Authorization: `Bearer ${this.props.auth.token}`,
        },
      });

      if (res.status === 200) {
        const { tokens } = res.data;

        this.setState({
          tokens,
          showAdd: false,

          filteredTokens: tokens.filter(
            (key) => Boolean(key.available) !== this.props.used
          ),
          loading: false,
        });
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

  generateToken = async (data) => {
    this.setState({
      loading: true,
    });

    try {
      const res = await axios({
        method: "POST",
        url: `https://food-ordering-system-nan.herokuapp.com/tokens/generate`,
        headers: {
          Authorization: `Bearer ${this.props.auth.token}`,
        },
        data,
      });

      if (res.status === 200) {
        await this.getAllTokens();
        Toast("success", res.data.status);
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
    const { used } = this.props;
    const noTokens = (
      <div className="no-tokens">
        <img src={sadface} alt="no tokens" />
        <p>You have created no tokens yet</p>
        <button className="btn btn-flat">Add Token</button>
      </div>
    );

    const tokensList = (
      <table className="body striped">
        <thead>
          <tr>
            <th>Token</th>
            <th>Amount</th>
            {!used ? <th>Date Added</th> : <th>Used by</th>}
          </tr>
        </thead>

        <tbody>
          {this.state.filteredTokens.length ? (
            this.state.filteredTokens.map((key) => (
              <tr key={key.id}>
                <td>{key.token}</td>
                <td>
                  <span>&#8358;</span> {key.amount}
                </td>
                {!used ? (
                  <td>
                    {new Date(key.date_added).toDateString().slice(4, 15)}
                  </td>
                ) : (
                  <td>
                    {key.username}
                    <br />
                    {new Date().toISOString(key.date_used).slice(0, 10)}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-tokens">
                No matches were found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );

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

    const tokensView = this.state.tokens.length ? tokensList : noTokens;

    return (
      <>
        <div className="tokens">
          {!this.state.showAdd ? (
            <div className="head">
              <input
                type="text"
                placeholder="Search..."
                onInput={(e) => this.handleSearch(e.target)}
              />

              <span
                className="add-item flex token-add"
                onClick={() => {
                  this.setState({ showAdd: true });
                }}
              >
                <i className="material-icons">add_circle_outline</i> Add
              </span>
            </div>
          ) : (
            <div className="head">
              <h5>Generate Token</h5>

              <span
                className="add-item flex close"
                onClick={() => {
                  this.setState({ showAdd: false });
                }}
              >
                <i className="material-icons">close</i>
              </span>
            </div>
          )}

          <div className="body">
            {this.state.loading ? (
              loader
            ) : !this.state.showAdd ? (
              tokensView
            ) : (
              <AddToken submit={this.generateToken} />
            )}
          </div>
        </div>
      </>
    );
  }
}

const map = (state) => {
  const { auth } = state;
  return {
    auth,
  };
};

export default connect(map)(Token);
