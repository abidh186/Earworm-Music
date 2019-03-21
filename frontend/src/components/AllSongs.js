import React, { Component } from "react";
import SongListItemContainer from "./SongListItemContainer";
import "../styles/AllSongs.css";

class AllSongs extends Component {
  state = {
    searchInput: "",
    clicked: false,
    showing: false
  };

  handleChange = event => {
    if (this.state.clicked) {
      this.setState({
        [event.target.name]: event.target.value,
        clicked: false
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };

  componentDidMount = () => {
    this.props.getAllSongs();
    this.props.getAllFavorites();
    this.props.getAllComments();
    this.props.getAllUsers();
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

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      clicked: true
    });
  };

  filterSongs = songArr => {
    let { searchInput, clicked } = this.state;
    if (clicked === false || searchInput === "") {
      return songArr;
    } else {
      return songArr.filter(song => {
        return song.title.toLowerCase().includes(searchInput.toLowerCase());
      });
    }
  };

  displaySongList = songs => {
    if (songs.length === 0) return <p>Your search didn't return anything</p>;
    let songList = songs.map(song => {
      return (
        <SongListItemContainer
          key={song.id}
          genreId={song.genre_id}
          songId={song.id}
          img={song.img_url}
          title={song.title}
          numberOfFavs={this.getFavs(song.id)}
        />
      );
    });
    return <div className="song-list">{songList}</div>;
  };

  render() {
    let { comments, users, songs, currentUser, favorites } = this.props;
    let { clicked } = this.state;
    if (!comments.length || !songs.length || !currentUser || !favorites.length)
      return null;
    if (!Object.values(users).length) return null;
    let filtered = this.filterSongs(songs);
    return (
      <div className="all-songs-container">
        <div className="search-form-container">
          <p id="search-label">
            Search By Title
            {clicked ? (
              <span className="searched"> (Showing searched)</span>
            ) : (
              <span className="all"> (Showing all)</span>
            )}
          </p>
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input
              required
              onChange={this.handleChange}
              name="searchInput"
              type="text"
              className="title-search-input"
            />
            <input
              className="title-search-button"
              type="submit"
              value="Search"
            />
          </form>
        </div>
        {clicked ? this.displaySongList(filtered) : this.displaySongList(songs)}
      </div>
    );
  }
}

export default AllSongs;
