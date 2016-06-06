import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import Select from 'react-select';
import cn from 'classnames';

import '../components/Forms/ReactSelect.scss';

import styles from './Item.scss';
import formStyles from './Forms/Forms.scss';

class Group extends Component {
  state = {
    selectValue: '',
    open: false
  };

  render() {
    let { group, users } = this.props;

    return (
      <div
        className={cn(
          styles.Item,
          {
            [styles.isOpen]: this.state.open
          }
        )}
      >
        <div
          className={styles['Item-Name']}
          onClick={this.handleItemClick}
        >
          {group.name}
        </div>

        <div className={styles['Item-Info']}>
          {
            group.members.length > 0 && (
              <div>
                <div>Members:</div>
                <ul className={styles['Items-List']}>
                  {
                    group.members.map((user) => (
                      <li key={user}>
                        <div className={styles['Items-List-Name']}>{this.getUser(user)}</div>
                        <button
                          className={styles['Items-List-Remove']}
                          onClick={this.handleRemoveUser.bind(this, group, user)}>&times;</button>
                      </li>
                    ))
                  }
                </ul>
              </div>
            )
          }

          {
            group.members.length > 0 && <button
              className={cn(formStyles['Form-Button'], formStyles['Form-Button--clear'])}
              onClick={this.handleRemoveAllUsers}>Remove all users from {group.name}</button>
          }

          {
            users.length > 0 ? (
              <form
                onSubmit={this.handleSubmit}
                className={formStyles['Form-Users']}
              >
                <div className={formStyles['Form-Item']}>
                  <label
                    className={formStyles['Form-Label']}
                  >
                    Users
                  </label>
                  <Select
                    className={formStyles['Select-Users']}
                    multi
                    name="Users"
                    onChange={this.handleSelectChange}
                    options={this.getValidUsers()}
                    placeholder="Add users to this group"
                    simpleValue
                    value={this.state.selectValue}
                  />
                </div>
                <div className={cn(formStyles['Form-Item'], formStyles['Form-Item--actions'])}>
                  <button
                    className={cn(
                      formStyles['Form-Button'],
                      formStyles['Form-Button--submit']
                    )}
                    type="submit"
                    disabled={this.state.selectValue === ''}
                    title={this.state.selectValue === '' ? 'Select some users to add' : 'Add users to the group'}
                  >
                    Add to {group.name}
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <div className={formStyles['Form-Item']}>
                  <label
                    className={formStyles['Form-Label']}
                  >
                    Users:
                  </label>
                  <div className={styles['Item-Empty']}>This group is empty.</div>
                </div>
              </div>
            )
          }
          <div className={styles['Item-Delete']}>
            <button
              className={cn(formStyles['Form-Button--delete'], formStyles['Form-Button'])}
              disabled={group.members.length > 0}
              onClick={this.handleDeleteGroup}
            >
              {`Delete Group "${group.name}"`}
            </button>
          </div>
        </div>
      </div>
    );
  }

  getUser = (userId) => {
    let found = _.find(this.props.users, (user) => user.id === userId);
    return found.name;
  };

  getValidUsers = () => {
    let { group, users } = this.props;

    return users
      .filter((u) => group.members.indexOf(u.id) === -1)
      .map((u) => ({value: u.id, label: u.name}));
  };

  handleItemClick = () => {
    this.setState({open: !this.state.open});

    if (!this.state.open) {
      this.props.goToGroup(this.props.group.id);
    }
    else {
      this.props.goToGroup('');
    }
  };

  handleRemoveUser = (group, user) => {
    this.props.removeUserFromGroup(group, user);
  };

  handleSelectChange = (value) => {
    this.setState({ selectValue: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.selectValue !== '') {
      this.props.addUsersToGroup(this.props.group.id, this.state.selectValue);
      this.setState({ selectValue: '' });
    }
  };

  handleDeleteGroup = () => {
    this.props.deleteGroup(this.props.group.id);
  };

  handleRemoveAllUsers = () => {
    this.props.removeAllUsersFromGroup(this.props.group.id);
  };
}

Group.propTypes = {
  users: PropTypes.array,
  group: PropTypes.object,
  removeUserFromGroup: PropTypes.func,
  deleteGroup: PropTypes.func,
  addUsersToGroup: PropTypes.func,
  removeAllUsersFromGroup: PropTypes.func,
  goToGroup: PropTypes.func
};

export default Group;


