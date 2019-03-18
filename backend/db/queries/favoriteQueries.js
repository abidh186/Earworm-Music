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

module.exports = { getAllFavorites };
