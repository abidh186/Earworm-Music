import { combineReducers } from "redux";

import SongReducer from "./songReducer.js";
import GenreReducer from "./genreReducer.js";
import CommentReducer from "./commentReducer.js";
import FavoriteReducer from "./favoriteReducer.js";
import UserReducer from "./userReducer.js";

const RootReducer = combineReducers({
  songs: SongReducer,
  favorites: FavoriteReducer,
  comments: CommentReducer,
  genres: GenreReducer,
  users: UserReducer
});

export default RootReducer;
