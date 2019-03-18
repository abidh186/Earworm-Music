import * as dataApi from "../utils/dataApi.js";

export let RECEIVE_SONGS = "RECEIVE_SONGS";
export let RECEIVE_FAVORITES = "RECEIVE_FAVORITES";
export let RECEIVE_COMMENTS = "RECEIVE_COMMENTS";
export let RECEIVE_GENRES = "RECEIVE_GENRES";
export let RECEIVE_USERS = "RECEIVE_USERS";

export const receivedUsers = users => {
  return {
    type: RECEIVE_USERS,
    users
  };
};
export const receivedSongs = songs => {
  return {
    type: RECEIVE_SONGS,
    songs
  };
};

export const receivedFavorites = favorites => {
  return {
    type: RECEIVE_FAVORITES,
    favorites
  };
};

export const receivedComments = comments => {
  return {
    type: RECEIVE_COMMENTS,
    comments
  };
};

export const receivedGenres = genres => {
  return {
    type: RECEIVE_GENRES,
    genres
  };
};

export const getAllUsers = () => dispatch => {
  return dataApi
    .getAllUsers()
    .then(res => {
      return dispatch(receivedUsers(res.data.users));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getAllSongs = () => dispatch => {
  return dataApi
    .getAllSongs()
    .then(res => {
      return dispatch(receivedSongs(res.data.songs));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getAllFavorites = () => dispatch => {
  return dataApi
    .getAllFavorites()
    .then(res => {
      return dispatch(receivedFavorites(res.data.favorites));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getAllComments = () => dispatch => {
  return dataApi
    .getAllComments()
    .then(res => {
      return dispatch(receivedComments(res.data.comments));
    })
    .catch(err => {
      console.log(err);
    });
};

export const getAllGenres = () => dispatch => {
  return dataApi
    .getAllGenres()
    .then(res => {
      return dispatch(receivedGenres(res.data.genres));
    })
    .catch(err => {
      console.log(err);
    });
};
