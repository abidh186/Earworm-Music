import React, { Component } from "react";
import SongListItemContainer from "./SongListItemContainer";

class SongsByPop extends Component {
  componentDidMount = () => {
    this.props.getAllSongs();
    this.props.getAllGenres();
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

  displaySongList = () => {
    let { songs } = this.props;
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
    return songList.sort((a, b) => {
      return b.props.numberOfFavs - a.props.numberOfFavs;
    });
  };

  render() {
    if (!this.props.currentUser) return null;
    let { comments, users, songs, favorites } = this.props;
    if (!comments.length || !songs.length || !favorites.length) return null;
    if (!Object.values(users).length) return null;
    return (
      <div className="by-pop-container">
        <h1>Songs By Pop page</h1>
        <div className="song-list">{this.displaySongList()}</div>
      </div>
    );
  }
}

export default SongsByPop;
