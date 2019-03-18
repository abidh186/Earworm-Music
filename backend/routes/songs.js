const express = require("express");
const router = express.Router();

const { getAllSongs } = require("../db/queries/songQueries.js");

router.get("/", getAllSongs);

module.exports = router;
