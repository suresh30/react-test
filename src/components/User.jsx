import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import * as actions from "../store/actions";

class User extends Component {
  editPass = () => {
    this.props.history.push("/updateuser");
  };

  loggedOut = () => {
    this.props.onLogout();
  };

  render() {
    return (
      <div>
        <div className="d-flex mt-2 row">
          <p>Username: {this.props.uName}</p>
          <p>
            Password: <input type="password" value={this.props.pass} disabled />
          </p>
        </div>
        <Button
          type="button"
          variant="outline-dark"
          className="mt-2"
          onClick={this.editPass}
        >
          Change Password
        </Button>
        <Button
          type="button"
          variant="outline-dark"
          className="mt-2 ml-2"
          onClick={this.loggedOut}
        >
          Logout
        </Button>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    uName: state.userName,
    pass: state.password,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(User);
