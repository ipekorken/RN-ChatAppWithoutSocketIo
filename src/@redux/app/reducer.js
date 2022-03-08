import {
  SET_USERTOKEN,
  SET_USERINFO,
  SET_USERS,
  SET_SELECTEDUSERS,
  SET_GROUPS,
  SET_MESSAGES,
} from './types';

const initialState = {
  userToken: null,
  userInfo: null,
  users: [],
  selectedUsers: [],
  groups: [],
  messages: [],
};

const reducer = (state = initialState, action) => {
  const {type} = action;

  switch (type) {
    case SET_USERTOKEN:
      return {...state, userToken: action.payload};
      break;
    case SET_USERINFO:
      return {...state, userInfo: action.payload};
      break;
    case SET_USERS:
      return {...state, users: action.payload};
      break;
    case SET_SELECTEDUSERS:
      return {...state, selectedUsers: action.payload};
      break;
    case SET_GROUPS:
      return {...state, groups: action.payload};
    case SET_MESSAGES:
      return {...state, messages: action.payload};
    default:
      break;
  }

  return state;
};

export default reducer;
