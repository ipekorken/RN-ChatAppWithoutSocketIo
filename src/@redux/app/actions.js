import {
  SET_USERTOKEN,
  SET_USERINFO,
  SET_USERS,
  SET_SELECTEDUSERS,
  SET_GROUPS,
  SET_MESSAGES,
} from './types';

export const setUserToken = userToken => ({
  type: SET_USERTOKEN,
  payload: userToken,
});
export const setUserInfo = userInfo => ({
  type: SET_USERINFO,
  payload: userInfo,
});
export const setUsers = users => ({
  type: SET_USERS,
  payload: users,
});
export const setSelectedUsers = selectedUsers => ({
  type: SET_SELECTEDUSERS,
  payload: selectedUsers,
});
export const setGroups = groups => ({
  type: SET_GROUPS,
  payload: groups,
});
export const setMessages = messages => ({
  type: SET_MESSAGES,
  payload: messages,
});
