import React from "react";
import axios from "axios";

class SongListItem extends React.Component {
  state = {
    commentBody: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    let { songId, currentUser } = this.props;
    axios
      .post("/comments", {
        commentBody: this.state.commentBody,
        userId: currentUser.id,
        songId: songId
      })
      .then(() => {
        this.props.getAllComments();
        this.props.getSongsByPop();
      });

    await this.setState({
      commentBody: ""
    });
  };

  isFavOfCurrentUser = songId => {
    return this.props.favorites.some(fav => {
      return (
        fav.user_id === this.props.currentUser.id && fav.song_id === songId
      );
    });
  };

  favorite = event => {
    event.preventDefault();
    axios
      .post("/favorites", {
        userId: this.props.currentUser.id,
        songId: this.props.songId
      })
      .then(() => {
        this.props.getAllFavorites();
        this.props.getSongsByPop();
      });
  };

  unfavorite = event => {
    event.preventDefault();
    let { favorites, currentUser, songId } = this.props;
    let favItem = favorites.filter(fav => {
      return fav.user_id === currentUser.id && fav.song_id === songId;
    });
    // debugger;
    axios.delete(`/favorites/${favItem["0"].id}`).then(() => {
      this.props.getAllFavorites();
      this.props.getSongsByPop();
    });
  };

  getSongComments = songId => {
    let { users, comments } = this.props;
    let commentList = comments.filter(comment => {
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

  render() {
    let { img, title, numberOfFavs, songId } = this.props;
    if (!this.props.comments.length) return null;
    let isFav = this.isFavOfCurrentUser(songId);
    console.log("isFav: ", isFav);
    return (
      <div className="song-list-item">
        <img src={img} alt="" />
        {isFav ? (
          <button onClick={this.unfavorite}>Unfavorite</button>
        ) : (
          <button onClick={this.favorite}>Favorite</button>
        )}
        <h3>{title}</h3>
        {numberOfFavs ? <p>{numberOfFavs} favorited</p> : null}
        <div>{this.getSongComments(songId)}</div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            type="text"
            required
            value={this.state.commentBody}
            name="commentBody"
          />
          <input type="submit" value="add comment" />
        </form>
      </div>
    );
  }
}

export default SongListItem;
