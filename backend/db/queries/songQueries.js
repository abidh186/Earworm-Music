const db = require("../connection.js");

const getAllSongs = (req, res, next) => {
  db.any("SELECT * FROM songs ORDER BY id DESC")
    .then(songs => {
      res.status(200).json({
        status: "success",
        songs,
        message: "all songs"
      });
    })
    .catch(err => next(err));
};

const postSong = (req, res, next) => {
  let user_id = parseInt(req.body.user_id);
  let genre_id = parseInt(req.body.genre_id);
  db.none(
    "INSERT INTO songs(title, genre_id, user_id, img_url) VALUES(${title}, ${genre_id}, ${user_id}, ${img_url})",
    {
      title: req.body.title,
      genre_id: genre_id,
      user_id: user_id,
      img_url: req.body.img_url
    }
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "added song"
      });
    })
    .catch(err => next(err));
};

module.exports = { getAllSongs, postSong };
