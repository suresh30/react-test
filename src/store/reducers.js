import * as actionTypes from "./actionTypes";

const initialState = {
  userName: "",
  password: "",
  isLogin: false,
  errmsg: "",
  authRedirectPath: "/",
  value: "",
  tasks: [],
};

const errorMsg = (state, action) => {
  return { ...state, errmsg: action.message };
};

const userLogin = (state, action) => {
  return {
    ...state,
    userName: action.uname,
    password: action.pass,
    isLogin: true,
  };
};

const setAuthRedirectPath = (state, action) => {
  return { ...state, authRedirectPath: action.path };
};

const setDropdownValue = (state, action) => {
  return { ...state, value: action.value };
};

const setTable = (state, action) => {
  // console.log(action.data);
  return { ...state, tasks: action.data };
};

const deleteTable = (state, action) => {
  return { ...state, tasks: action.tbl };
};

const addTask = (state, action) => {
  return { ...state, tasks: action.task };
};

const updatePassword = (state, action) => {
  return { isLogin: false };
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WRONG_DETAILS:
      return errorMsg(state, action);
    case actionTypes.LOGGED_IN:
      return userLogin(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    case actionTypes.SET_PARAGRAPH:
      return setDropdownValue(state, action);
    case actionTypes.LOAD_TABLE:
      return setTable(state, action);
    case actionTypes.DELETE_TASK:
      return deleteTable(state, action);
    case actionTypes.ADD_TASK:
      return addTask(state, action);
    case actionTypes.UPDATE_PASSWORD:
      return updatePassword(state, action);
    case actionTypes.LOGOUT:
      return updatePassword(state, action);
    default:
      return state;
  }
};

export default reducers;
