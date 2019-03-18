const db = require("../connection.js");

const getAllComments = (req, res, next) => {
  db.any("SELECT * FROM comments")
    .then(comments => {
      res.status(200).json({
        status: "success",
        comments,
        message: "all comments"
      });
    })
    .catch(err => next(err));
};

module.exports = { getAllComments };
