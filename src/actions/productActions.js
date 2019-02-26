import { FETCH_PRODUCTS } from "../constants/actions";
import { ADD_FAVORITE } from "../constants/actions";
import { REFRESH_FAVORITES } from "../constants/actions";

export const fetchProducts = () => dispatch => {
  console.log("fetching");
  fetch("http://localhost:3000/products.json")
    .then(data => data.json())
    .then(products =>
      dispatch({
        type: FETCH_PRODUCTS,
        payload: products
      })
    );
};

export const addFavorite = product => dispatch => {
  dispatch({
    type: ADD_FAVORITE,
    payload: product
  });
};

export const refreshFavorites = favProducts => dispatch => {
  dispatch({
    type: REFRESH_FAVORITES,
    payload: favProducts
  });
};
