const pgp = require("pg-promise")({});
const db = pgp("postgres://localhost/unit_five_final");

module.exports = db;
