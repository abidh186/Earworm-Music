// Songs should filter only submit, not onChange
// All other required functionality is working well.
// CSS needs some attention please.


import React, { Component } from "react";
import SongListItemContainer from "./SongListItemContainer";
import "../styles/allSongs.css";

class AllSongs extends Component {
  state = {
    searchInput: "",
    clicked: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      clicked: true
    });
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

  displaySongList = () => {
    let { songs } = this.props;
    let filteredSongs = this.filterSongs(songs);
    // debugger;
    let songList = filteredSongs.map(song => {
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
    // debugger;
    return <div>{songList}</div>;
  };

  render() {
    // console.log("here: ", this.state.searchInput);
    // if (!this.props.currentUser) return null;
    let { comments, users, songs, currentUser } = this.props;
    if (!comments.length || !songs.length || !currentUser) return null;
    if (!Object.values(users).length) return null;
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} name="searchInput" type="text" />
          <input type="submit" value="Search By Title" />
        </form>
        {this.displaySongList()}
      </div>
    );
  }
}

export default AllSongs;
