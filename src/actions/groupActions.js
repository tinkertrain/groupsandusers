import cuid from 'cuid';
import { push } from 'react-router-redux';

export const CREATE_GROUP = 'CREATE_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';
export const ADD_USERS_TO_GROUP = 'ADD_USERS_TO_GROUP';
export const REMOVE_USER_FROM_GROUP = 'REMOVE_USER_FROM_GROUP';
export const REMOVE_ALL_USERS_FROM_GROUP = 'REMOVE_ALL_USERS_FROM_GROUP';

export function createGroup(name, users) {
  let id = cuid.slug();

  return (dispatch) => {
    dispatch({
      type: CREATE_GROUP,
      name,
      id,
      users
    });
    dispatch(push(`/groups/${id}`));
  };
}

export function deleteGroup(groupId) {
  return {
    type: DELETE_GROUP,
    groupId
  };
}


export function addUsersToGroup(groupId, users) {
  return {
    type: ADD_USERS_TO_GROUP,
    groupId,
    users
  };
}

export function removeUserFromGroup(group, userId) {
  return {
    type: REMOVE_USER_FROM_GROUP,
    group,
    userId
  };
}

export function removeAllUsersFromGroup(groupId) {
  return {
    type: REMOVE_ALL_USERS_FROM_GROUP,
    groupId
  };
}

export function goToGroup(groupId) {
  return (dispatch) => {
    dispatch(push(`/groups/${groupId}`));
  };
}
