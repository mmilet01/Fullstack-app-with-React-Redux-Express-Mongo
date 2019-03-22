import {
  USER_REGISTER,
  USER_LOGIN,
  FAIL_LOGIN,
  USER_LOADED,
  USER_LOGOUT
} from "../constants/actions";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  isLoggedIn: false,
  errorMsg: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        user: action.payload.data,
        isLoggedIn: true
      };
    case USER_REGISTER:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLoggedIn: true,
        errorMsg: "",
        user: action.payload.user,
        token: action.payload.token
      };
    case USER_LOGIN:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
        token: action.payload.token,
        errorMsg: ""
      };
    case FAIL_LOGIN:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        errorMsg: action.payload
      };
    case USER_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isLoggedIn: false,
        errorMsg: ""
      };
    default:
      return state;
  }
}
