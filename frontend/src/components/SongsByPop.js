import React, { Component } from "react";
import SongListItemContainer from "./SongListItemContainer";

class SongsByPop extends Component {
  componentDidMount = () => {
    this.props.getSongsByPop();
    this.props.getAllGenres();
    this.props.getAllFavorites();
    this.props.getAllComments();
    this.props.getAllUsers();
  };

  displaySongList = () => {
    let { songs } = this.props;
    let songList = songs.map(song => {
      // debugger;
      return (
        <SongListItemContainer
          key={song.id}
          songId={song.id}
          img={song.img_url}
          title={song.title}
          numberOfFavs={song.favorites}
        />
      );
    });
    return <div>{songList}</div>;
  };

  render() {
    // debugger;
    if (!this.props.currentUser) return null;
    let { comments, users, songs } = this.props;
    if (!comments.length) return null;
    if (!songs.length) return null;
    if (!Object.values(users).length) return null;
    return (
      <div>
        <h1>Songs By Pop page</h1>
        {this.displaySongList()}
      </div>
    );
  }
}

export default SongsByPop;
