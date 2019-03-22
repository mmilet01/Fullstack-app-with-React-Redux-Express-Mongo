import { FETCH_PRODUCTS } from "../constants/actions";
import { ADD_TO_FAVORITE } from "../constants/actions";
import { REMOVE_FROM_FAVORITE } from "../constants/actions";
import { SEARCH_PRODUCTS } from "../constants/actions";
import { ADD_NEW_ITEM } from "../constants/actions";
import { DELETE_PRODUCT } from "../constants/actions";
import axios from "axios";

export const fetchProducts = () => dispatch => {
  axios.get("http://localhost:5000/api/items").then(res =>
    dispatch({
      type: FETCH_PRODUCTS,
      payload: res.data
    })
  );

  /* fetch("http://localhost:5000", { mode: "no-cors" }).then(res =>
    dispatch({
      type: FETCH_PRODUCTS,
      payload: res.data
    })
  ); */
};
export const addNewItem = item => dispatch => {
  /* axios.post("http://localhost:5000", item).then(res =>
    dispatch({
      type: ADD_NEW_ITEM,
      payload: item
    })
  ); */
  axios.post("http://localhost:5000/api/items", item);
  dispatch({
    type: ADD_NEW_ITEM,
    payload: item
  });
};

export const addToFavorite = product => dispatch => {
  dispatch({
    type: ADD_TO_FAVORITE,
    payload: product
  });
};

export const removeFromFavorites = favProduct => dispatch => {
  dispatch({
    type: REMOVE_FROM_FAVORITE,
    payload: favProduct
  });
};

export const searchProducts = value => dispatch => {
  dispatch({
    type: SEARCH_PRODUCTS,
    payload: value
  });
};

export const deleteProduct = id => dispatch => {
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
  /* axios.delete(`http://localhost:5000/${id}`);
  dispatch({
    type: DELETE_PRODUCT,
    payload: id
  }); */
  axios
    .delete(`http://localhost:5000/api/items/delete/${id}`, config)
    .then(res => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: id
      });
    })
    .catch(err => {
      alert("You cant delete it you're not mario mileta");
      console.log(err.response.data);
    });
};

/* export const addGrade = grade => dispatch => {
  dispatch({
    type: ADD_GRADE,
    payload: grade
  });
};
 */
