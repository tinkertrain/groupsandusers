import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ActionTypes from '../actions/';
import _ from 'lodash/fp';
import cuid from 'cuid';

let initialUserState = [
  {
    id: cuid.slug(),
    name: 'John'
  },
  {
    id: cuid.slug(),
    name: 'Paul'
  },
  {
    id: cuid.slug(),
    name: 'George'
  },
  {
    id: cuid.slug(),
    name: 'Ringo'
  }
];

function users(state = initialUserState, action) {
  switch (action.type) {
    case ActionTypes.ADD_USER:
      let user = {
        id: action.id,
        name: action.name
      };

      return [user, ...state];

    case ActionTypes.DELETE_USER:
      return state.filter((user) => user.id !== action.userId);

    default:
      return state;
  }
}

let initialGroupState = [
  {
    id: cuid.slug(),
    name: 'Super Group',
    members: []
  },
  {
    id: cuid.slug(),
    name: 'Editors',
    members: []
  },
  {
    id: cuid.slug(),
    name: 'Admins',
    members: []
  }
];

function groups(state = initialGroupState, action) {
  switch (action.type) {
    case ActionTypes.CREATE_GROUP:
      let group = {
        id: action.id,
        name: action.name,
        members: action.users !== '' ? action.users.split(',') : []
      };

      return [group, ...state];

    case ActionTypes.DELETE_GROUP:
      return state.filter((group) => group.id !== action.groupId);

    case ActionTypes.ADD_USER:
      let userId = action.id;
      let groupsArr = action.groups.split(',');

      let updatedGroupWithMembers = state.map((g) => {
        let newMember = [];

        if (groupsArr.indexOf(g.id) !== -1) {
          if (userId !== '') {
            newMember.push(userId);
          }
        }

        return {
          id: g.id,
          name: g.name,
          members: g.members.concat(newMember)
        };
      });

      return updatedGroupWithMembers;

    case ActionTypes.DELETE_USER:
      return state.map((group) => {
        group.members = _.without(group.members, action.userId);
        return group;
      });

    case ActionTypes.REMOVE_USER_FROM_GROUP:
      return state.map((group) => {
        if (group.id === action.group.id) {
          group.members = group.members.filter((member) => member !== action.userId);
        }

        return group;
      });

    case ActionTypes.REMOVE_ALL_USERS_FROM_GROUP:
      return state.map((group) => {
        if (group.id === action.groupId) {
          group.members = [];
        }

        return group;
      });

    case ActionTypes.ADD_USERS_TO_GROUP:
      let users = action.users.split(',');
      let groups = action.groupId.split(',');

      return state.map((group) => {
        groups.forEach((g) => {
          if (group.id === g) {
            group.members = _.union(group.members, users);
          }
        });

        return group;
      });

    default:
      return state;
  }
}

let rootReducer = combineReducers({
  users,
  groups,
  routing: routerReducer
});

export default rootReducer;
