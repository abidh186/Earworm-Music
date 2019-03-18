import { RECEIVE_COMMENTS } from "../actions/allActions.js";

const CommentReducer = (oldState = {}, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return action.comments;
    default:
      return oldState;
  }
};

export default CommentReducer;
