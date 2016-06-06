import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as groupActions from '../actions/groupActions';

import Group from './Group';

import styles from './Items.scss';

class Groups extends Component {
  render() {
    let { groups, users } = this.props;

    return (
      <div className={styles.Container}>
        <h2 className={styles['Items-Title']}>Existing Groups</h2>
        {
          groups.map((group) => (
            <Group
              key={group.id}
              group={group}
              users={users}
              removeUserFromGroup={this.props.removeUserFromGroup}
              deleteGroup={this.props.deleteGroup}
              addUsersToGroup={this.props.addUsersToGroup}
              removeAllUsersFromGroup={this.props.removeAllUsersFromGroup}
              goToGroup={this.props.goToGroup}
              params={this.props.params}
            />
          ))
        }
      </div>
    );
  }
}

Groups.propTypes = {
  users: PropTypes.array,
  groups: PropTypes.array,
  params: PropTypes.object,
  removeUserFromGroup: PropTypes.func,
  deleteGroup: PropTypes.func,
  addUsersToGroup: PropTypes.func,
  goToGroup: PropTypes.func,
  removeAllUsersFromGroup: PropTypes.func
};

let mapStateToProps = ({users, groups}) => {
  return {
    users,
    groups
  };
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(groupActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
