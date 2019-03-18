import { RECEIVE_USERS } from "../actions/allActions.js";

const normalizeData = ArrOfItems => {
  let obj = {};
  ArrOfItems.forEach(eachItem => {
    return (obj[eachItem.id] = eachItem);
  });
  return obj;
};

const UserReducer = (oldState = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return normalizeData(action.users);
    default:
      return oldState;
  }
};

export default UserReducer;
