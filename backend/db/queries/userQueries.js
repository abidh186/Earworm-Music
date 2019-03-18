const db = require("../connection.js");

const getAllUsers = (req, res, next) => {
  db.any("SELECT * FROM users")
    .then(users => {
      res.status(200).json({
        status: "success",
        users,
        message: "all users"
      });
    })
    .catch(err => next(err));
};

module.exports = { getAllUsers };
