import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import "../styles/SongListItem.css";

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
      });
  };

  unfavorite = event => {
    event.preventDefault();
    let { favorites, currentUser, songId } = this.props;
    let favItem = favorites.filter(fav => {
      return fav.user_id === currentUser.id && fav.song_id === songId;
    });
    axios.delete(`/favorites/${favItem["0"].id}`).then(() => {
      this.props.getAllFavorites();
    });
  };

  getSongComments = songId => {
    let { users, comments } = this.props;
    let commentList = comments.filter(comment => {
      return comment.song_id === songId;
    });
    let filtered = commentList.map(comment => {
      return (
        <div className="comment-text-container" key={comment.id}>
          <p>{comment.comment_body}</p>
          <NavLink
            className="username-link"
            exact
            to={`/users/${comment.user_id}`}
          >
            {users[comment.user_id].username}
          </NavLink>
        </div>
      );
    });
    return filtered;
  };

  render() {
    let { img, title, numberOfFavs, songId } = this.props;
    if (!this.props.comments.length) return null;
    let isFav = this.isFavOfCurrentUser(songId);
    return (
      <div className="song-list-item">
        <img className="song-img" src={img} alt="" />
        <div className="song-content">
          <div className="song-info">
            <p className="song-title">{title}</p>
            <div className="favorite-stuff">
              <p className="favorite-count">
                {numberOfFavs} <i className="fas fa-heart" />
              </p>
              {isFav ? (
                <span className="favorite-button" onClick={this.unfavorite}>
                  <i className="fas fa-minus" />
                </span>
              ) : (
                <span className="unfavorite-button" onClick={this.favorite}>
                  <i className="fas fa-plus" />
                </span>
              )}
            </div>
          </div>
          <div className="comments-container">
            {this.getSongComments(songId)}
          </div>
          <form className="comment-form" onSubmit={this.handleSubmit}>
            <input
              className="comment-input"
              onChange={this.handleChange}
              type="text"
              required
              value={this.state.commentBody}
              name="commentBody"
              placeholder="Enter Comment..."
            />
            <input
              className="comment-button"
              type="submit"
              value="add comment"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default SongListItem;
