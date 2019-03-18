import { RECEIVE_FAVORITES } from "../actions/allActions.js";

const FavoriteReducer = (oldState = {}, action) => {
  switch (action.type) {
    case RECEIVE_FAVORITES:
      return action.favorites;
    default:
      return oldState;
  }
};

export default FavoriteReducer;
