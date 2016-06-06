import cuid from 'cuid';
import { push } from 'react-router-redux';

export const ADD_USER = 'ADD_USER';
export const DELETE_USER = 'DELETE_USER';

export function addUser(name, groups) {
  let id = cuid.slug();

  return (dispatch) => {
    dispatch({
      type: ADD_USER,
      name,
      id,
      groups
    });
    dispatch(push(`/users/${id}`));
  };
}

export function deleteUser(userId) {
  return {
    type: DELETE_USER,
    userId
  };
}

export function goToUser(userId) {
  return (dispatch) => {
    dispatch(push(`/users/${userId}`));
  };
}
