const express = require("express");
const router = express.Router();

const { getAllFavorites } = require("../db/queries/favoriteQueries.js");

router.get("/", getAllFavorites);

module.exports = router;
