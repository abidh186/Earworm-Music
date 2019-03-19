const db = require("../connection.js");

const getAllFavorites = (req, res, next) => {
  db.any("SELECT * FROM favorites")
    .then(favorites => {
      res.status(200).json({
        status: "success",
        favorites,
        message: "all favorites"
      });
    })
    .catch(err => next(err));
};

const postFavorite = (req, res, next) => {
  let userId = parseInt(req.body.userId);
  let songId = parseInt(req.body.songId);
  db.none(
    "INSERT INTO favorites(user_id, song_id) VALUES(${userId}, ${songId})",
    {
      userId,
      songId
    }
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "added favorite"
      });
    })
    .catch(err => next(err));
};

const deleteFavorite = (req, res, next) => {
  let favId = parseInt(req.params.id);
  db.none("DELETE FROM favorites WHERE id = ${favId}", { favId })
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "deleted Fav"
      });
    })
    .catch(err => next(err));
};

module.exports = { getAllFavorites, postFavorite, deleteFavorite };
