import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import Dropdown from "./DropDown";
import Tasks from "./Tasks";
import UpdateUser from "./UpdateUser";
import User from "./User";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <h4 className="navbar-brand">Logo</h4>
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggle"
              aria-controls="navbarToggle"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggle">
              <ul className="navbar-nav me-auto mb-2 mb-lg-2">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link" activeClassName="active">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/tasks"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Tasks
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/user"
                    className="nav-link"
                    activeClassName="active"
                  >
                    User
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route path="/" exact component={Dropdown} />
          <Route path="/tasks" exact component={Tasks} />
          <Route path="/user" exact component={User} />
          <Route path="/updateuser" exact component={UpdateUser} />
        </Switch>
      </div>
    );
  }
}

export default Navbar;
