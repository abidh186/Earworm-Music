import React, { Component } from "react";

class AllSongs extends Component {
  state = {
    input: ""
  };

  componentDidMount = () => {
    this.props.getAllSongs();
    this.props.getAllFavorites();
    this.props.getAllComments();
    this.props.getAllUsers();
  };

  getLikes = songId => {
    let { favorites } = this.props;
    return favorites.filter(like => {
      return like.song_id === songId;
    }).length;
  };

  commentsForOneSong = songId => {
    let { users } = this.props;
    let commentList = this.props.comments.filter(comment => {
      return comment.song_id === songId;
    });
    let filtered = commentList.map(comment => {
      return (
        <p key={comment.id}>
          {comment.comment_body} comment author:{" "}
          {users[comment.user_id].username}
        </p>
      );
    });
    return <div>{filtered}</div>;
  };

  displaySongsWithCommentsAndLikes = () => {
    let songList = this.props.songs.map(song => {
      return (
        <div key={song.id}>
          <h3>song title: {song.title}</h3>
          <p>comments: </p>
          {this.commentsForOneSong(song.id)}
          <p>favorites</p>
          {this.getLikes(song.id)}
        </div>
      );
    });
    return <div>{songList}</div>;
  };

  render() {
    console.log("here: ", this.props.users);
    // debugger;
    let { comments, songs, users } = this.props;
    // debugger;
    if (!comments.length) return null;
    if (!songs.length) return null;
    if (!Object.values(users).length) return null;
    return <div className="App">{this.displaySongsWithCommentsAndLikes()}</div>;
  }
}

export default AllSongs;
