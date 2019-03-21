import React, { Component } from "react";
import SongListItemContainer from "./SongListItemContainer";
import "../styles/SongsByGenre.css";
class SongsByGenre extends Component {
  componentDidMount = () => {
    this.props.getAllGenres();
    this.props.getAllFavorites();
    this.props.getAllComments();
    this.props.getAllUsers();
    this.props.getAllSongs();
  };

  state = {
    chosenGenre: ""
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
    let { songs, genres } = this.props;
    let { chosenGenre } = this.state;
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
    if (!chosenGenre) return songList;
    let chosenGenreItem = genres.filter(genre => {
      return genre.genre_name.toLowerCase() === chosenGenre.toLowerCase();
    });
    return songList.filter(song => {
      return song.props.genreId === chosenGenreItem["0"].id;
    });
  };

  listGenres = () => {
    let { genres } = this.props;
    let genreList = genres.map(genre => {
      return <option key={genre.id}>{genre.genre_name}</option>;
    });
    return genreList;
  };

  changeHandler = e => {
    this.setState({
      chosenGenre: e.target.value
    });
  };

  render() {
    if (!this.props.currentUser) return null;
    let { comments, users, songs, genres } = this.props;
    if (!comments.length || !songs.length || !genres.length) return null;
    if (!Object.values(users).length) return null;
    return (
      <div className="by-genre-container">
        <h1>Songs By Genre</h1>
        <select className="genre-dropdown" onChange={this.changeHandler}>
          <option> </option>
          {this.listGenres()}
        </select>
        <div className="song-list">{this.displaySongList()}</div>
      </div>
    );
  }
}

export default SongsByGenre;
