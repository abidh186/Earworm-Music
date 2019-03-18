const db = require("./connection");

const faker = require("faker");

let genres = [];
for (let i = 0; i < 11; i++) {
  let name = faker.random.words();
  let str = `('${name}')`;
  genres.push(str);
}

let movies = [];
for (let i = 0; i < 20; i++) {
  let title = faker.lorem.words();
  let genre_id = Math.floor(Math.random() * 10) + 1;
  let img_url = faker.image.image();
  let str = `('${title}', ${genre_id}, '${img_url}')`;
  movies.push(str);
}

let ratings = [];
for (let i = 0; i < 100; i++) {
  let stars = Math.floor(Math.random() * 5) + 1;
  let movie_id = Math.floor(Math.random() * 20) + 1;
  let str = `(${stars}, ${movie_id})`;
  ratings.push(str);
}

let comments = [];
for (let i = 0; i < 30; i++) {
  let body = faker.lorem.paragraph();
  let movie_id = Math.floor(Math.random() * 20) + 1;
  let str = `('${body}', ${movie_id})`;
  comments.push(str);
}

genres = genres.join(", ");
movies = movies.join(", ");
ratings = ratings.join(", ");
comments = comments.join(", ");

db.none("INSERT INTO genres(name) VALUES " + genres + ";")
  .then(() => {
    db.none(
      "INSERT INTO movies(title, genre_id, img_url) VALUES " + movies + ";"
    ).then(() => {
      db.none(
        "INSERT INTO ratings(stars, movie_id) VALUES " + ratings + ";"
      ).then(() => {
        db.none(
          "INSERT INTO comments(body, movie_id) VALUES " + comments + ";"
        );
      });
    });
  })
  .catch(err => {
    console.log(err);
  });
