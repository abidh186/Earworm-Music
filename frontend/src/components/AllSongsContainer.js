import { connect } from "react-redux";

import AllSongs from "./AllSongs";

import {
  getAllSongs,
  getAllComments,
  getAllFavorites,
  getAllUsers
} from "../actions/allActions.js";

const mapStateToProps = state => {
  return {
    users: state.users,
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
    getAllFavorites: () => dispatch(getAllFavorites())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllSongs);
