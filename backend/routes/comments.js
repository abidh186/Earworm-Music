const express = require("express");
const router = express.Router();

const {
  getAllComments,
  postComment
} = require("../db/queries/commentQueries.js");

router.get("/", getAllComments);
router.post("/", postComment);

module.exports = router;
