import { FETCH_PRODUCTS } from "../constants/actions";
import { ADD_FAVORITE } from "../constants/actions";
import { REFRESH_FAVORITES } from "../constants/actions";

const initialState = {
  products: [],
  favorites: [],
  fav: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    case ADD_FAVORITE:
      return {
        ...state,
        fav: action.payload
      };
    case REFRESH_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      };
    default:
      return state;
  }
}
