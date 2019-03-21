import React, { Component } from "react";
import SongListItemContainer from "./SongListItemContainer";
import axios from "axios";
import "../styles/UserProfile.css";

class SongsByPop extends Component {
  componentDidMount = () => {
    this.props.getAllUsers();
    this.props.getAllSongs();
    this.props.getAllFavorites();
    this.props.getAllComments();
    this.props.getAllGenres();
  };

  state = {
    posted: true,
    title: "",
    genre: "",
    img_url: "",
    err_warning: false,
    emptyGenre: false
  };

  clickPosted = () => {
    this.setState({
      posted: true
    });
  };
  clickFavorited = () => {
    this.setState({
      posted: false
    });
  };

  getFavs = songId => {
    let { favorites } = this.props;
    let favs = favorites.filter(fav => {
      return fav.song_id === songId;
    });
    if (favs.length) {
      return favs.length;
    } else {
      return 0;
    }
  };

  displayFavorited = () => {
    let { songs, favorites } = this.props;
    let userId = parseInt(this.props.match.params.id);

    let favs = favorites
      .filter(fav => {
        return fav.user_id === userId;
      })
      .map(favItem => favItem.song_id);

    let favSongsList = songs.filter(favSong => {
      return favs.includes(favSong.id);
    });

    let songList = favSongsList.map(song => {
      return (
        <SongListItemContainer
          key={song.id}
          user_id={song.user_id}
          genreId={song.genre_id}
          songId={song.id}
          img={song.img_url}
          title={song.title}
          numberOfFavs={this.getFavs(song.id)}
          userId={song.user_id}
        />
      );
    });
    return songList;
  };

  displayPosted = () => {
    let { songs } = this.props;
    let userId = parseInt(this.props.match.params.id);
    let songList = songs.map(song => {
      return (
        <SongListItemContainer
          key={song.id}
          user_id={song.user_id}
          genreId={song.genre_id}
          songId={song.id}
          img={song.img_url}
          title={song.title}
          numberOfFavs={this.getFavs(song.id)}
          userId={song.user_id}
        />
      );
    });
    return songList.filter(songItem => {
      return songItem.props.user_id === userId;
    });
  };

  listGenres = () => {
    let { genres } = this.props;
    let genreList = genres.map(genre => {
      return <option key={genre.id}>{genre.genre_name}</option>;
    });
    return genreList;
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSelect = e => {
    this.setState({
      genre: e.target.value,
      emptyGenre: false
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let { currentUser, genres } = this.props;
    let { title, genre, img_url } = this.state;
    if (genre === "Pick a Genre" || genre === "") {
      this.setState({
        emptyGenre: true,
        err_warning: false
      });
      return;
    }
    let filteredItem = genres.filter(genreItem => {
      return genreItem.genre_name === genre;
    });
    axios
      .post("/songs", {
        title: title,
        genre_id: filteredItem["0"].id,
        user_id: currentUser.id,
        img_url: img_url
      })
      .then(() => {
        this.props.getAllSongs();
        this.props.getAllGenres();
      })
      .then(() => {
        this.setState({
          title: "",
          img_url: "",
          genre: "",
          err_warning: false,
          emptyGenre: false
        });
      })
      .catch(err => {
        if (err.response.status === 500) {
          console.log(err);
          this.setState({
            err_warning: true
          });
        }
      });
  };

  render() {
    let userId = parseInt(this.props.match.params.id);
    let { posted, title, genre, img_url, err_warning, emptyGenre } = this.state;
    let { users, songs, favorites, currentUser, genres } = this.props;
    if (!Object.values(users).length) return null;
    if (!songs.length || !favorites.length || !genres.length) return null;
    return (
      <div className="user-profile-container">
        <h2 className="username">{users[userId].username}</h2>
        <div className="toggle-buttons">
          <div className={posted ? "selected-pen" : "unselected"}>
            <i onClick={this.clickPosted} className="fas fa-pen" />
          </div>
          <div className={posted ? "unselected" : "selected-heart"}>
            <i onClick={this.clickFavorited} className="fas fa-heart" />
          </div>
        </div>
        {posted ? (
          <>
            {userId === currentUser.id ? (
              <div className="post-song-container">
                {err_warning ? (
                  <p className="post-song-err">
                    Please Make Sure it's a Unique Title.
                  </p>
                ) : null}
                {emptyGenre ? (
                  <p className="empty-genre-err">Please Select a Genre.</p>
                ) : null}
                <p id="add-song-label">Add a New Song</p>
                <form className="post-song-form" onSubmit={this.handleSubmit}>
                  <input
                    required
                    onChange={this.handleChange}
                    name="title"
                    placeholder="Song Title"
                    type="text"
                    value={title}
                    className="song-title-input"
                  />
                  <input
                    required
                    onChange={this.handleChange}
                    name="img_url"
                    placeholder="Image URL"
                    type="text"
                    value={img_url}
                    className="song-url-input"
                  />
                  <select
                    required
                    value={genre}
                    name="genre"
                    className="song-genre-input"
                    onChange={this.handleSelect}
                  >
                    <option id="selected">Pick a Genre</option>
                    {this.listGenres()}
                  </select>
                  <input
                    className="post-song-button"
                    type="submit"
                    value="Add Song"
                  />
                </form>
              </div>
            ) : null}
            <div className="song-list">{this.displayPosted()}</div>
          </>
        ) : (
          <div className="song-list">{this.displayFavorited()}</div>
        )}
      </div>
    );
  }
}

export default SongsByPop;
