import { FETCH_PRODUCTS, DELETE_PRODUCT } from "../constants/actions";
import { ADD_TO_FAVORITE } from "../constants/actions";
import { REMOVE_FROM_FAVORITE } from "../constants/actions";
import { SEARCH_PRODUCTS } from "../constants/actions";
import { ADD_NEW_ITEM } from "../constants/actions";

const initialState = {
  products: [],
  favorites: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      console.log("fetching");
      console.log(action.payload);
      return {
        ...state,
        products: action.payload
      };

    case ADD_TO_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };

    case REMOVE_FROM_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(
          prod => prod._id !== action.payload._id
        )
      };
    case ADD_NEW_ITEM:
      return {
        ...state,
        products: [action.payload, ...state.products]
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(prod => prod._id !== action.payload)
      };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        searched: state.products.filter(prod =>
          prod.name.toUpperCase().includes(action.payload.toUpperCase())
        )
      };
    default:
      return state;
  }
}
