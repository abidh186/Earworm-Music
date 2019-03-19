import React, { Component } from "react";
import SongListItemContainer from "./SongListItemContainer";
import "../styles/allSongs.css";

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
    }
  };

  displaySongList = () => {
    let songList = this.props.songs.map(song => {
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
    if (!this.props.currentUser) return null;
    let { comments, songs, users } = this.props;
    if (!comments.length) return null;
    if (!songs.length) return null;
    if (!Object.values(users).length) return null;
    return <div className="App">{this.displaySongList()}</div>;
  }
}

export default AllSongs;
