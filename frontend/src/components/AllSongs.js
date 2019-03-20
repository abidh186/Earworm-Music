import React, { Component } from "react";
import SongListItemContainer from "./SongListItemContainer";
import "../styles/allSongs.css";

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
    return <div>{songList}</div>;
  };

  render() {
    let { comments, users, songs, currentUser } = this.props;
    let { clicked } = this.state;
    if (!comments.length || !songs.length || !currentUser) return null;
    if (!Object.values(users).length) return null;
    let filtered = this.filterSongs(songs);
    return (
      <div className="App">
        {clicked ? <p>Showing searched</p> : <p>showing all</p>}
        <form onSubmit={this.handleSubmit}>
          <input
            required
            onChange={this.handleChange}
            name="searchInput"
            type="text"
          />
          <input type="submit" value="Search By Title" />
        </form>
        {clicked ? this.displaySongList(filtered) : this.displaySongList(songs)}
      </div>
    );
  }
}

export default AllSongs;
