import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../actions/userActions';
import * as groupActions from '../actions/groupActions';

import User from './User';

import styles from './Items.scss';

class Users extends Component {
  render() {
    let { users, groups } = this.props;

    return (
      <div className={styles.Container}>
        <h2 className={styles['Items-Title']}>Existing Users</h2>
        {
          users.map((user) => (
            <User
              key={user.id}
              user={user}
              groups={groups}
              deleteUser={this.props.deleteUser}
              addUsersToGroup={this.props.addUsersToGroup}
              removeUserFromGroup={this.props.removeUserFromGroup}
              goToUser={this.props.goToUser}
              params={this.props.params}
            />
          ))
        }
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array,
  groups: PropTypes.array,
  params: PropTypes.object,
  deleteUser: PropTypes.func,
  addUsersToGroup: PropTypes.func,
  goToUser: PropTypes.func,
  removeUserFromGroup: PropTypes.func
};

let mapStateToProps = ({users, groups}) => {
  return {
    users,
    groups
  };
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...userActions, ...groupActions}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
