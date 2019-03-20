import React, { Component } from "react";
import SongListItemContainer from "./SongListItemContainer";
import axios from "axios";
import "../styles/profile.css";

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
    err_warning: false
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

  handleSubmit = event => {
    event.preventDefault();
    let { currentUser, genres } = this.props;
    let { title, genre, img_url } = this.state;

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
          err_warning: false
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
    let { posted, title, genre, img_url, err_warning } = this.state;
    let { users, songs, favorites, currentUser, genres } = this.props;
    if (!Object.values(users).length) return null;
    if (!songs.length || !favorites.length || !genres.length) return null;
    return (
      <div className="user-profile-container">
        <button
          className={posted ? "selected" : "unselected"}
          onClick={this.clickPosted}
        >
          Posted
        </button>
        <button
          className={posted ? "unselected" : "selected"}
          onClick={this.clickFavorited}
        >
          Favorited
        </button>
        <h2 className="username">{users[userId].username}</h2>
        {posted ? (
          <>
            {userId === currentUser.id ? (
              <div className="post-song-form">
                {err_warning ? (
                  <p className="post-song-err">
                    Please make sure it's a unique title
                  </p>
                ) : null}
                <form onSubmit={this.handleSubmit}>
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
                  <label>Pick Genre-></label>
                  <select
                    required
                    value={genre}
                    name="genre"
                    onChange={this.handleChange}
                  >
                    <option>{""}</option>
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
