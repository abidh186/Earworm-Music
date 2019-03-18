const express = require("express");
const router = express.Router();

const { getAllGenres } = require("../db/queries/genreQueries.js");

router.get("/", getAllGenres);

module.exports = router;
