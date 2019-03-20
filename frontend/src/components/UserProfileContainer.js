import { connect } from "react-redux";

import UserProfile from "./UserProfile";

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
    genres: state.genres,
    songs: state.songs,
    comments: state.comments,
    favorites: state.favorites,
    currentUser: state.users[1]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    getAllSongs: () => dispatch(getAllSongs()),
    getAllComments: () => dispatch(getAllComments()),
    getAllFavorites: () => dispatch(getAllFavorites()),
    getAllGenres: () => dispatch(getAllGenres())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
