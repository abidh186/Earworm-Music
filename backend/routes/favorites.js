const express = require("express");
const router = express.Router();

const {
  getAllFavorites,
  postFavorite,
  deleteFavorite
} = require("../db/queries/favoriteQueries.js");

router.get("/", getAllFavorites);
router.post("/", postFavorite);
router.delete("/:id", deleteFavorite);

module.exports = router;
