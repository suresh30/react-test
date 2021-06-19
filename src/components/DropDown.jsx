import React, { Component } from "react";
import dropdown from "../dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Information from "./Information";

class DropDown extends Component {
  state = {
    value: "",
  };

  handleSelect = (e) => {
    console.log(e);
    this.props.onSetValue(e);
    return this.setState({ value: e });
  };

  render() {
    return (
      <div>
        <div className="drop">
          <DropdownButton
            alignRight
            title="Dropdown right"
            id="dropdown-menu-align-right"
            onSelect={this.handleSelect}
          >
            {dropdown.map((drop) => {
              return (
                <Dropdown.Item key={drop.value} eventKey={drop.value}>
                  {drop.value}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </div>
        <Information />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSetValue: (val) => dispatch(actions.setValue(val)),
  };
};

export default connect(null, mapDispatchToProps)(DropDown);
