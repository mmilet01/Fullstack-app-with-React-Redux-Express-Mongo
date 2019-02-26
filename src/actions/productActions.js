import { FETCH_PRODUCTS } from "../constants/actions";
import { ADD_TO_FAVORITE } from "../constants/actions";
import { REMOVE_FROM_FAVORITE } from "../constants/actions";
import { SEARCH_PRODUCTS } from "../constants/actions";

export const fetchProducts = () => dispatch => {
  fetch("http://localhost:3000/products.json")
    .then(data => data.json())
    .then(products =>
      dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      })
    );
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
  if (value === "") {
    fetch("http://localhost:3000/products.json")
      .then(data => data.json())
      .then(products =>
        dispatch({
          type: FETCH_PRODUCTS,
          payload: products
        })
      );
  } else {
    fetch("http://localhost:3000/products.json")
      .then(result => result.json())
      .then(data =>
        data.filter(prod =>
          prod.name.toLowerCase().includes(value.toLowerCase())
        )
      )
      .then(products =>
        dispatch({
          type: FETCH_PRODUCTS,
          payload: products
        })
      );
  }
};
