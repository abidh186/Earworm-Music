const express = require("express");
const router = express.Router();

const { getAllComments } = require("../db/queries/commentQueries.js");

router.get("/", getAllComments);

module.exports = router;
