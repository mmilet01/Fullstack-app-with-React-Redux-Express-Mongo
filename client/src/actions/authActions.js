import axios from "axios";
import {
  USER_REGISTER,
  USER_LOGIN,
  FAIL_LOGIN,
  USER_LOADED,
  USER_LOGOUT
} from "../constants/actions";

export const loadUser = () => dispatch => {
  const token = localStorage.getItem("token");
  console.log(token);
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  axios
    .get("http://localhost:5000/api/userLogin", config)
    .then(user => {
      dispatch({
        type: USER_LOADED,
        payload: user
      });
    })
    .catch(err => console.log(err.response.data));
};

export const register = user => dispatch => {
  axios.post("http://localhost:5000/api/userRegister", user).then(res => {
    console.log(res);
    dispatch({
      type: USER_REGISTER,
      payload: res.data
    });
  });
};

export const login = user => dispatch => {
  axios
    .post("http://localhost:5000/api/userLogin", user)
    .then(res => {
      dispatch({
        type: USER_LOGIN,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: FAIL_LOGIN,
        payload: err.response.data
      })
    );
};

export const logout = () => dispatch => {
  dispatch({
    type: USER_LOGOUT
  });
};
