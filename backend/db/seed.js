const db = require("./connection");

const faker = require("faker");

let genres = [];
for (let i = 0; i < 5; i++) {
  let genre_name = faker.random.words();
  let str = `('${genre_name}')`;
  genres.push(str);
}

let songs = [];
for (let i = 0; i < 15; i++) {
  let title = faker.lorem.words();
  let genre_id = Math.floor(Math.random() * 5) + 1;
  let user_id = Math.floor(Math.random() * 10) + 1;
  let img_url = faker.image.image();
  let str = `('${title}', ${genre_id}, ${user_id}, '${img_url}')`;
  songs.push(str);
}

let favorites = [];
for (let i = 0; i < 40; i++) {
  let user_id = Math.floor(Math.random() * 10) + 1;
  let song_id = Math.floor(Math.random() * 15) + 1;
  let str = `(${user_id}, ${song_id})`;
  favorites.push(str);
}

let comments = [];
for (let i = 0; i < 20; i++) {
  let comment_body = faker.lorem.sentence();
  let user_id = Math.floor(Math.random() * 10) + 1;
  let song_id = Math.floor(Math.random() * 15) + 1;
  let str = `('${comment_body}', ${user_id}, ${song_id})`;
  comments.push(str);
}

genres = genres.join(", ");
songs = songs.join(", ");
favorites = favorites.join(", ");
comments = comments.join(", ");

db.none("INSERT INTO genres(genre_name) VALUES " + genres + ";")
  .then(() => {
    db.none(
      "INSERT INTO songs(title, genre_id, user_id, img_url) VALUES " +
        songs +
        ";"
    ).then(() => {
      db.none(
        "INSERT INTO favorites(user_id, song_id) VALUES " + favorites + ";"
      ).then(() => {
        db.none(
          "INSERT INTO comments(comment_body, user_id, song_id) VALUES " +
            comments +
            ";"
        );
      });
    });
  })
  .catch(err => {
    console.log(err);
  });
