DROP DATABASE IF EXISTS unit_five_final;
CREATE DATABASE unit_five_final;

\c unit_five_final;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE
);

CREATE TABLE genres (
  id SERIAL PRIMARY KEY,
  genre_name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL UNIQUE,
  genre_id INT REFERENCES genres(id),
  user_id INT REFERENCES users(id),
  img_url VARCHAR NOT NULL
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  song_id INT REFERENCES songs(id)
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  comment_body VARCHAR NOT NULL,
  user_id INT REFERENCES users(id),
  song_id INT REFERENCES songs(id)
);
