import React, { Component } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import { connect } from "react-redux";
import { Switch, Route, withRouter } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.history.push("/login");
    console.log(this.props);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.loggedIn !== prevProps.loggedIn) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        {!this.props.loggedIn ? (
          <Switch>
            <Route path="/login" exact component={Login} />
          </Switch>
        ) : (
          <Navbar />
        )}
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    loggedIn: state.isLogin,
  };
};

export default withRouter(connect(mapStatetoProps)(App));
