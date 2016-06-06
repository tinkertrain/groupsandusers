import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import * as userActions from '../../actions/userActions';

import UserForm from '../../components/Forms/UserForm';
import Users from '../../components/Users';

import styles from './Page.scss';

class UsersPage extends Component {
  render() {
    const {users, groups, route, params} = this.props;

    return (
      <div>
        <h1 className={styles['Page-Title']}>
          <span className={styles['Title-Name']}>Users</span>
          {
            route.path !== 'users/add' && groups.length !== 0 && (
              <Link
                to="/users/add"
                className={styles['Button-Create']}
              >Add New</Link>
            )
          }
        </h1>
        {
          groups.length === 0 && (
            <div>
              <p>To add a user, first create a group</p>
              <Link to="/groups/create">Create Group</Link>
            </div>
          )
        }
        {
          groups.length > 0 && route.path === 'users/add' && (
            <div>
              <UserForm
                create={this.props.addUser}
                groups={groups}
              />
            </div>
          )
        }
        {
          groups.length > 0 && users.length > 0 && (
            <Users users={users} params={params} />
          )
        }
      </div>
    );
  }
}

UsersPage.propTypes = {
  users: PropTypes.array,
  groups: PropTypes.array,
  route: PropTypes.object,
  addUser: PropTypes.func,
  params: PropTypes.object
};

let mapStateToProps = ({users, groups}) => {
  return {
    users,
    groups
  };
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(userActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);

