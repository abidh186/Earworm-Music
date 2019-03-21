const db = require("./connection");

const faker = require("faker");

let imgArr = [
  "http://hdwpro.com/wp-content/uploads/2017/01/3D-Cool-Image.jpg",
  "http://sfwallpaper.com/images/cool-background-pic-20.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQARToiGS14Lfe88caymAWGQZEnD0nWZ111Xisn3eGVOFJ6XjBQ",
  "https://wallpapercave.com/wp/b8ahwKP.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqtKOtYK68nSSrTiFxU4hLDHy2uTZqQUYzYKc9YEszFlFsSPTS",
  "http://sfwallpaper.com/images/cool-design-wallpapers-6.jpg",
  "https://static1.squarespace.com/static/51b3dc8ee4b051b96ceb10de/t/5c3e68fcb8a045e043d85ffe/1547593983378/?format=2500w",
  "https://blog.yellowoctopus.com.au/wp-content/uploads/2018/05/yellow-octopus-cool-pictures-57.jpg",
  "https://ichef.bbci.co.uk/images/ic/640x360/p06my6zr.jpg",
  "https://i.gifer.com/5P9l.gif",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Tsmf56OgJxusXxyarZww_XYakDImYdKmKkxHgbkRHaOxc_Iuwg",
  "https://blog.yellowoctopus.com.au/wp-content/uploads/2018/05/yellow-octopus-cool-pictures-10.jpg",
  "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/RKwGR4d/cool-neon-tunnel-background_vj04tbf7g__F0000.png",
  "http://www.itaniumsolutions.org/pics/max/33/331214_cool-wallpapers-1920x1080.jpg",
  "https://resources.stuff.co.nz/content/dam/images/1/t/h/6/c/9/image.related.StuffLandscapeSixteenByNine.710x400.1th5wg.png/1548013768602.jpg",
  "https://lensvid.com/wp-content/uploads/2015/04/7-Funky-Photography-Tips.jpg",
  "https://i.pinimg.com/originals/00/e2/af/00e2af4b2840a946f3d95cebdd710aad.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz0bDbgZzO6y4BIStXSAFEnyBq-LCPNzZYMVRB_qoft3O6VN3Pgg",
  "https://airbuzz.one/wp-content/uploads/2018/09/creative_drone_photo_ideas-778x445.jpg",
  "https://static1.squarespace.com/static/53d01d95e4b089801fe85c89/53d03304e4b01c1b0c1ed961/542d8f4ae4b0028374502083/1412373046630/san_diego_travel_photography_18.jpg?format=1500w"
];

let genres = [];
for (let i = 0; i < 5; i++) {
  let genre_name = faker.random.words();
  let str = `('${genre_name}')`;
  genres.push(str);
}

let users = [];
for (let i = 0; i < 10; i++) {
  let username = faker.internet.userName();
  let str = `('${username}')`;
  users.push(str);
}

let songs = [];
for (let i = 0; i < 20; i++) {
  let title = faker.lorem.words();
  let genre_id = Math.floor(Math.random() * 5) + 1;
  let user_id = Math.floor(Math.random() * 10) + 1;
  let img_url = imgArr[i];
  let str = `('${title}', ${genre_id}, ${user_id}, '${img_url}')`;
  songs.push(str);
}

let favorites = [];
for (let i = 0; i < 80; i++) {
  let user_id = Math.floor(Math.random() * 10) + 1;
  let song_id = Math.floor(Math.random() * 20) + 1;
  let str = `(${user_id}, ${song_id})`;
  favorites.push(str);
}

let comments = [];
for (let i = 0; i < 50; i++) {
  let comment_body = faker.lorem.sentence();
  let user_id = Math.floor(Math.random() * 10) + 1;
  let song_id = Math.floor(Math.random() * 20) + 1;
  let str = `('${comment_body}', ${user_id}, ${song_id})`;
  comments.push(str);
}

users = users.join(", ");
genres = genres.join(", ");
songs = songs.join(", ");
favorites = favorites.join(", ");
comments = comments.join(", ");

db.none("INSERT INTO genres(genre_name) VALUES " + genres + ";")
  .then(() => {
    db.none("INSERT INTO users(username) VALUES " + users + ";").then(() => {
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
    });
  })
  .catch(err => {
    console.log(err);
  });
