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

const postComment = (req, res, next) => {
  let userId = parseInt(req.body.userId);
  let songId = parseInt(req.body.songId);
  db.none(
    "INSERT INTO comments(comment_body, user_id, song_id) VALUES(${commentBody}, ${userId}, ${songId})",
    {
      commentBody: req.body.commentBody,
      userId: userId,
      songId: songId
    }
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "added comment"
      });
    })
    .catch(err => next(err));
};

module.exports = { getAllComments, postComment };
