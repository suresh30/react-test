import React from "react";
import dropdown from "../dropdown";
import { connect } from "react-redux";

const Information = (props) => {
  return (
    <div>
      {dropdown.map((drop) => {
        let para = "";
        if (props.dropVal === drop.value) {
          return (para = drop.paragraph);
        }
        return <p key={props.value}>{para}</p>;
      })}
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    dropVal: state.value,
  };
};

export default connect(mapStatetoProps)(Information);
