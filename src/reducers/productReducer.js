import { FETCH_PRODUCTS } from "../constants/actions";
import { ADD_TO_FAVORITE } from "../constants/actions";
import { REMOVE_FROM_FAVORITE } from "../constants/actions";
import { SEARCH_PRODUCTS } from "../constants/actions";

const initialState = {
  products: [],
  favorites: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
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
        favorites: state.favorites.filter(prod => prod.id !== action.payload.id)
      };
    case SEARCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    default:
      return state;
  }
}
