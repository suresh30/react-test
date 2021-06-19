import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { Form, Button, Table } from "react-bootstrap";

class Tasks extends Component {
  state = {
    title: "",
    completed: false,
    addTask: false,
  };

  componentDidMount() {
    this.props.onTableLoaded();
  }

  deleteBtn = (id) => {
    if (window.confirm("Are you Sure you want to delete this")) {
      return this.props.onDeleteData(id);
    } else {
      return null;
    }
  };

  addTaskBtn = () => {
    return this.setState({ addTask: true });
  };

  handleChange = (e) => {
    return this.setState({ ...this.state, [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAddTask(
      this.state.title + 1,
      this.state.title,
      this.state.completed
    );
    return this.setState({ title: "", addTask: false });
  };

  render() {
    return (
      <div>
        <div>
          <Table striped bordered hover size="sm">
            <tbody>
              {this.props.tasks.map((task, index) => {
                return (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.title}</td>
                    <td>{task.completed.toString()}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => this.deleteBtn(task.id)}
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.addTaskBtn}
          >
            Add task
          </button>
          {!this.state.addTask ? null : (
            <Form onSubmit={this.submitHandler}>
              <Form.Group controlId="task">
                <Form.Label className="mt-2">Task</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter task"
                  value={this.state.title}
                  name="title"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          )}
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    tasks: state.tasks,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTableLoaded: () => dispatch(actions.loadTable()),
    onDeleteData: (id) => dispatch(actions.deleteTask(id)),
    onAddTask: (id, title, complete) =>
      dispatch(actions.addTask(id, title, complete)),
  };
};

export default connect(mapStatetoProps, mapDispatchToProps)(Tasks);
