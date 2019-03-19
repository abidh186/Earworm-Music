const express = require("express");
const router = express.Router();

const { getAllSongs, allSongByPop } = require("../db/queries/songQueries.js");

router.get("/", getAllSongs);
router.get("/favs", allSongByPop);

module.exports = router;
