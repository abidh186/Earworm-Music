import { RECEIVE_SONGS } from "../actions/allActions.js";

const SongReducer = (oldState = {}, action) => {
  switch (action.type) {
    case RECEIVE_SONGS:
      return action.songs;
    default:
      return oldState;
  }
};

export default SongReducer;
