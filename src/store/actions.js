import * as actions from "./actionTypes";
import user from "../users";
import axios from "axios";

// Login
export const loginUser = (uname, pass) => {
  return {
    type: actions.LOGGED_IN,
    uname: uname,
    pass: pass,
  };
};

export const onLoginCheck = (uname, pass) => {
  return (dispatch) => {
    const users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
    if (users === null) {
      console.log(user);
      localStorage.setItem("users", JSON.stringify(user));
      for (let i = 0; i < user.length; i++) {
        if (user[i].username === uname) {
          if (user[i].password === pass) {
            dispatch(loginUser(user[i].username, user[i].password));
          } else {
            dispatch(wrongDetail("Password is wrong"));
          }
        } else {
          dispatch(wrongDetail("Username is wrong"));
        }
      }
    } else {
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === uname) {
          if (users[i].password === pass) {
            dispatch(loginUser(users[i].username, users[i].password));
          } else {
            dispatch(wrongDetail("Password is wrong"));
          }
        } else {
          dispatch(wrongDetail("Username is wrong"));
        }
      }
    }
  };
};

export const wrongDetail = (msg) => {
  return {
    type: actions.WRONG_DETAILS,
    message: msg,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actions.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

// Home

export const setValue = (value) => {
  return {
    type: actions.SET_PARAGRAPH,
    value: value,
  };
};

// Tasks
export const loadTable = () => {
  return (dispatch) => {
    let table = JSON.parse(localStorage.getItem("table"));
    if (table === null) {
      console.log(table);
      axios
        .get("https://jsonplaceholder.typicode.com/todos?userId=1")
        .then((response) => {
          //   console.log(response.data);
          localStorage.setItem("table", JSON.stringify(response.data));
          dispatch(loadTableCheck(response.data));
        })
        .catch((err) => console.log(err));
    } else {
      console.log(table);
      dispatch(loadTableCheck(table));
    }
  };
};

export const loadTableCheck = (res) => {
  //   console.log(res);
  return {
    type: actions.LOAD_TABLE,
    data: res,
  };
};

export const deleteTask = (id) => {
  return (dispatch) => {
    let tableData = JSON.parse(localStorage.getItem("table"));
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i].id === id) {
        tableData.splice(i, 1);
      }
    }
    localStorage.setItem("table", JSON.stringify(tableData));
    let newData = JSON.parse(localStorage.getItem("table"));
    dispatch(confirmDelete(newData));
  };
};

export const confirmDelete = (data) => {
  return {
    type: actions.DELETE_TASK,
    tbl: data,
  };
};

export const addTask = (id, title, complete) => {
  let data = {
    userId: 1,
    id: id,
    title: title,
    completed: complete,
  };
  return (dispatch) => {
    let task = JSON.parse(localStorage.getItem("table"));
    console.log(task, data);
    task.push(data);
    console.log(task);
    localStorage.setItem("table", JSON.stringify(task));
    dispatch(addTaskComplete(task));
  };
};

export const addTaskComplete = (data) => {
  return {
    type: actions.ADD_TASK,
    task: data,
  };
};

// users
export const updatePassword = (userName, pass) => {
  return (dispatch) => {
    let user = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < user.length; i++) {
      if (user[i].username === userName) {
        user[i].password = pass;
      }
    }
    localStorage.setItem("users", JSON.stringify(user));
    dispatch(savePassword());
  };
};

export const savePassword = () => {
  return {
    type: actions.UPDATE_PASSWORD,
  };
};

export const logout = () => {
  return {
    type: actions.LOGOUT,
  };
};
