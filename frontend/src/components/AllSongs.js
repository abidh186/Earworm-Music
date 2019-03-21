import React, { Component } from "react";
import SongListItemContainer from "./SongListItemContainer";
import "../styles/AllSongs.css";

class AllSongs extends Component {
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

  state = {
    searchInput: "",
    searchWith: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let { searchInput } = this.state;
    this.setState({
      searchWith: searchInput
    });
  };

  filterSongs = songArr => {
    let { searchWith } = this.state;
    if (searchWith === "") {
      return songArr;
    } else {
      return songArr.filter(song => {
        return song.title.toLowerCase().includes(searchWith.toLowerCase());
      });
    }
  };

  displaySongList = songs => {
    if (songs.length === 0)
      return <p id="empty-search-err">Your Search Didn't Return Any Results</p>;
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

  // {clicked ? (
  //   <span className="searched"> (Showing searched)</span>
  // ) : (
  //   <span className="all"> (Showing all)</span>
  // )}

  render() {
    let { comments, users, songs, currentUser, favorites } = this.props;
    let { searchInput } = this.state;
    if (!comments.length || !songs.length || !currentUser || !favorites.length)
      return null;
    if (!Object.values(users).length) return null;
    let filtered = this.filterSongs(songs);
    return (
      <div className="all-songs-container">
        <div className="search-form-container">
          <h2 id="search-label">Search By Title</h2>
          <form className="search-form" onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleChange}
              name="searchInput"
              type="text"
              className="title-search-input"
              placeholder="Search Songs ..."
              value={searchInput}
            />
            <input
              className="title-search-button"
              type="submit"
              value="Search"
            />
          </form>
        </div>
        {this.displaySongList(filtered)}
      </div>
    );
  }
}

export default AllSongs;
