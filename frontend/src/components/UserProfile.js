import React, { Component } from "react";
import SongListItemContainer from "./SongListItemContainer";
import "../styles/profile.css";

class SongsByPop extends Component {
  componentDidMount = () => {
    this.props.getAllUsers();
    this.props.getAllSongs();
    this.props.getAllFavorites();
    this.props.getAllComments();
  };

  state = {
    posted: true
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

  render() {
    let userId = this.props.match.params.id;
    let { posted } = this.state;
    let { users, songs, favorites } = this.props;
    if (!Object.values(users).length) return null;
    if (!songs.length || !favorites.length) return null;
    // debugger;
    return (
      <div>
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
        <h2>{users[userId].username}</h2>
        {posted ? (
          <div>
            <h4>Posted Content</h4>
            {this.displayPosted()}
          </div>
        ) : (
          <div>
            <h4>Fav Content</h4>
            {this.displayFavorited()}
          </div>
        )}
      </div>
    );
  }
}

export default SongsByPop;
