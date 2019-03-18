import { RECEIVE_GENRES } from "../actions/allActions.js";

const GenreReducer = (oldState = {}, action) => {
  switch (action.type) {
    case RECEIVE_GENRES:
      return action.genres;
    default:
      return oldState;
  }
};

export default GenreReducer;
