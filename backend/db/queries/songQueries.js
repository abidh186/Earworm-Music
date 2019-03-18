const db = require("../connection.js");

const getAllSongs = (req, res, next) => {
  db.any("SELECT * FROM songs")
    .then(songs => {
      res.status(200).json({
        status: "success",
        songs,
        message: "all songs"
      });
    })
    .catch(err => next(err));
};

////songs with number of favorites
/*SELECT songs.id, title, img_url, genre_id, COUNT(favorites.song_id) AS favorites
 FROM songs
 LEFT JOIN favorites ON songs.id = favorites.song_id
 GROUP BY songs.id, title, img_url, genre_id
ORDER BY id*/

/////// songs with Comments
// SELECT songs.id, title, img_url, genre_id, ARRAY_AGG(comment_body) AS comments
// FROM songs
// LEFT JOIN comments ON songs.id=comments.song_id
// GROUP BY songs.id, title, img_url, genre_id

///////get number of favorites by song
// SELECT COUNT(id) FROM favorites WHERE song_id = 7

module.exports = { getAllSongs };
