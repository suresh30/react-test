import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { Form, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  componentDidMount() {
    if (this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  handleChange = (e) => {
    return this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onValidateUser(this.state.username, this.state.password);
    return this.setState({ username: "", password: "" });
  };

  alertClosed = () => {
    this.props.onWrongDetail("");
    return this.setState({
      username: "",
      password: "",
    });
  };

  render() {
    let errorMessage = null;

    if (this.props.message !== "") {
      errorMessage = (
        <div className="Alert">
          <Alert variant="danger" onClose={this.alertClosed} dismissible>
            <Alert.Heading>
              There is an error with the details provided.
            </Alert.Heading>
            <p>{this.props.message}</p>
          </Alert>
        </div>
      );
    }

    let authRedirect = null;

    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }

    return (
      <div className="Main">
        {errorMessage}
        {authRedirect}
        <div className="Box">
          <div className="Form">
            <Form onSubmit={this.submitHandler}>
              <Form.Group controlId="users">
                <Form.Label className="mt-2">Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Enter username"
                  value={this.state.email}
                  name="username"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="pass">
                <Form.Label className="mt-2">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    message: state.errmsg,
    authRedirectPath: state.authRedirectPath,
    isAuthenticated: state.isLogin,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    onValidateUser: (u, p) => dispatch(actions.onLoginCheck(u, p)),
    onWrongDetail: (msg) => dispatch(actions.wrongDetail(msg)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Login);

/* <form onSubmit={this.submitHandler}>
          <div className="mb-3">
            <label for="user" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              name="username"
              id="user"
              onChange={this.handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="pass" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              name="password"
              id="pass"
              onChange={this.handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form> */
