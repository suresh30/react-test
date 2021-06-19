import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import * as actions from "../store/actions";

class UpdateUser extends Component {
  state = {
    username: "",
    password: "",
  };

  componentDidMount() {
    this.setState({ username: this.props.uName, password: this.props.pass });
  }

  handleChange = (e) => {
    return this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onPasswordUpdated(this.state.username, this.state.password);
    return this.setState({ username: "", password: "" });
  };

  loggedOut = () => {
    this.props.onLogout();
  };

  render() {
    return (
      <div className="d-flex mt-2">
        <Form onSubmit={this.submitHandler}>
          <Form.Group controlId="Username">
            <Form.Label>
              Username: <span>{this.state.username}</span>
            </Form.Label>
          </Form.Group>
          <Form.Group controlId="Password">
            <Form.Label>New Password: </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit" variant="outline-dark" className="mt-2">
              Save Password
            </Button>
            <Button
              type="button"
              variant="outline-dark"
              className="mt-2 ml-2"
              onClick={this.loggedOut}
            >
              Logout
            </Button>
          </Form.Group>
        </Form>
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
    onPasswordUpdated: (user, pass) =>
      dispatch(actions.updatePassword(user, pass)),
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(UpdateUser);
