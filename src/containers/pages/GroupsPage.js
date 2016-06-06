import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import * as groupActions from '../../actions/groupActions';

import GroupForm from '../../components/Forms/GroupForm';
import Groups from '../../components/Groups';

import styles from './Page.scss';

class GroupsPage extends Component {
  render() {
    const {users, groups, route, params} = this.props;

    return (
      <div>
        <h1 className={styles['Page-Title']}>
          <span className={styles['Title-Name']}>Groups</span>
          {
            route.path !== 'groups/create' && (
              <Link
                to="/groups/create"
                className={styles['Button-Create']}
              >Create New</Link>
            )
          }
        </h1>
        {
          route.path === 'groups/create' && (
            <div>
              <GroupForm
                create={this.props.createGroup}
                users={users}
              />
            </div>
          )
        }
        {
          groups.length > 0 && (
            <Groups
              groups={groups}
              users={users}
              params={params}
            />
          )
        }
      </div>
    );
  }
}

GroupsPage.propTypes = {
  users: PropTypes.array,
  groups: PropTypes.array,
  route: PropTypes.object,
  createGroup: PropTypes.func,
  params: PropTypes.object
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupsPage);

