import React, { Component } from "react";
import SongListItemContainer from "./SongListItemContainer";
import "../styles/allSongs.css";

class AllSongs extends Component {
  state = {
    songs: this.props.songs,
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
      clicked: true,
      searchInput: ""
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
    }
  };

  filterSongs = songArr => {
    let { searchInput } = this.state;
    return songArr.filter(song => {
      return song.title.toLowerCase().includes(searchInput.toLowerCase());
    });
  };
  // filterSongs = songArr => {
  //   let { searchInput, clicked } = this.state;
  //   if (clicked === false || searchInput === "") {
  //     return songArr;
  //   } else {
  //     return songArr.filter(song => {
  //       return song.title.toLowerCase().includes(searchInput.toLowerCase());
  //     });
  //   }
  // };

  displaySongList = () => {
    let { songs } = this.state;
    // let filteredSongs = this.filterSongs(songs);
    // debugger;
    let songList = songs.map(song => {
      return (
        <SongListItemContainer
          key={song.id}
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
    // console.log("here: ", this.state.searchInput);
    if (!this.props.currentUser) return null;
    let { comments, users, songs } = this.props;
    if (!comments.length) return null;
    if (!this.state.songs.length) return null;
    if (!Object.values(users).length) return null;
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            name="searchInput"
            type="text"
            value={this.state.searchInput}
          />
          <input type="submit" value="Search By Title" />
        </form>
        {this.displaySongList()}
      </div>
    );
  }
}

export default AllSongs;
