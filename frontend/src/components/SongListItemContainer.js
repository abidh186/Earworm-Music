import { connect } from "react-redux";

import SongListItem from "./SongListItem";

import {
  // getAllSongs,
  // getAllUsers,
  getAllFavorites,
  getAllComments
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
    // getAllUsers: () => dispatch(getAllUsers()),
    // getAllSongs: () => dispatch(getAllSongs()),
    getAllFavorites: () => dispatch(getAllFavorites()),
    getAllComments: () => dispatch(getAllComments())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongListItem);
