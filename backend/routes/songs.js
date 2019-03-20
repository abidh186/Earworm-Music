const express = require("express");
const router = express.Router();

const { getAllSongs, postSong } = require("../db/queries/songQueries.js");

router.get("/", getAllSongs);
router.post("/", postSong);

module.exports = router;
