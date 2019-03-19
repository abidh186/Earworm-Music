import { connect } from "react-redux";

import SongsByGenre from "./SongsByGenre.js";

import {
  getAllSongs,
  getAllComments,
  getAllFavorites,
  getAllUsers,
  getAllGenres
} from "../actions/allActions.js";

const mapStateToProps = state => {
  return {
    users: state.users,
    songs: state.songs,
    comments: state.comments,
    favorites: state.favorites,
    genres: state.genres,
    currentUser: state.users[1]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    getAllComments: () => dispatch(getAllComments()),
    getAllFavorites: () => dispatch(getAllFavorites()),
    getAllGenres: () => dispatch(getAllGenres()),
    getAllSongs: () => dispatch(getAllSongs())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongsByGenre);
