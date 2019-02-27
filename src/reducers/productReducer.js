import { FETCH_PRODUCTS } from "../constants/actions";
import { ADD_TO_FAVORITE } from "../constants/actions";
import { REMOVE_FROM_FAVORITE } from "../constants/actions";
import { SEARCH_PRODUCTS } from "../constants/actions";

const initialState = {
  products: [],
  favorites: [],
  searched: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      if (state.products.length === 0) {
        return {
          ...state,
          products: action.payload,
          searched: action.payload
        };
      } else {
        return {
          ...state
          /* products: action.payload,
          searched: action.payload */
        };
      }

    case ADD_TO_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case REMOVE_FROM_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(prod => prod.id !== action.payload.id)
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
