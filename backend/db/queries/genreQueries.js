const db = require("../connection.js");

const getAllGenres = (req, res, next) => {
  db.any("SELECT * FROM genres")
    .then(genres => {
      res.status(200).json({
        status: "success",
        genres,
        message: "all genres"
      });
    })
    .catch(err => next(err));
};

module.exports = { getAllGenres };
