import axios from "axios";

//getAll* requests
export const getAllSongs = () => axios.get(`/songs`);
export const getAllFavorites = () => axios.get(`/favorites`);
export const getAllComments = () => axios.get(`/comments`);
export const getAllGenres = () => axios.get(`/gneres`);
export const getAllUsers = () => axios.get(`/users`);
