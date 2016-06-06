import React, { Component, PropTypes } from 'react';
import Link from 'react-router';
import Select from 'react-select';
import cn from 'classnames';

import '../components/Forms/ReactSelect.scss';
import styles from './Item.scss';
import formStyles from './Forms/Forms.scss';

class User extends Component {
  state = {
    selectValue: '',
    open: false,
    noEmpty: false
  };

  render() {
    let { user, params } = this.props;

    return (
      <div
        className={cn(
          styles.Item,
          {
            [styles.isOpen]: this.state.open || params.id === user.id
          }
        )}
      >
        <div
          className={styles['Item-Name']}
          onClick={this.handleItemClick}
        >
          {user.name}
        </div>

        <div className={styles['Item-Info']}>
          {
            this.renderMembership().length > 0 &&
            <div>
              <div>Member of:</div>
              { this.state.noEmpty && (
                <div className={styles['Items-List-NoEmpty']}>
                  A user must belong to at least one group
                  <button onClick={this.dismissMessage} className={styles['Dismiss-Button']}>&times;</button>
                </div>
                )
              }
              <ul className={styles['Items-List']}>
                {
                  this.renderMembership()
                }
              </ul>
            </div>
          }

          <form
            onSubmit={this.handleSubmit}
            className={formStyles['Form-Users']}
          >
            <div className={formStyles['Form-Item']}>
              <label
                className={formStyles['Form-Label']}
              >
                Groups
              </label>
              <Select
                className={formStyles['Select-Users']}
                multi
                name="Users"
                onChange={this.handleSelectChange}
                options={this.getValidGroups()}
                placeholder="Add user to these groups"
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
                title={this.state.selectValue === '' ? 'Select some groups to add the user to' : 'Add user to selected groups'}
              >
                Add
              </button>
            </div>
          </form>
          <div className={styles['Item-Delete']}>
            <button
              className={cn(formStyles['Form-Button--delete'], formStyles['Form-Button'])}
              onClick={this.handleDeleteUser}
            >
              Delete User
            </button>
          </div>
        </div>
      </div>
    );
  }

  getValidGroups = () => {
    let { groups, user } = this.props;

    return groups
      .filter((group) => group.members.indexOf(user.id) === -1)
      .map((group) => ({value: group.id, label: group.name}));
  };

  handleItemClick = () => {
    this.setState({open: !this.state.open});

    if (!this.state.open) {
      this.props.goToUser(this.props.user.id);
    }
    else {
      this.props.goToUser('');
    }
  };

  renderMembership = () => {
    let { groups, user } = this.props;

    return groups
      .filter((group) => group.members.indexOf(user.id) !== -1)
      .map((group) => (
        <li key={group.id}>
          <div className={styles['Items-List-Name']}>{group.name}</div>
          <button
            className={styles['Items-List-Remove']}
            onClick={this.handleRemoveUserFromGroup.bind(this, group, user.id)}>&times;</button>
        </li>
      ));
  };

  handleRemoveUserFromGroup = (group, userId) => {
    let { groups } = this.props;

    let memberships = groups
      .filter((group) => group.members.indexOf(userId) !== -1);

    if (memberships.length === 1) {
      this.setState({noEmpty: true});
    }
    else {
      this.setState({noEmpty: false});
      this.props.removeUserFromGroup(group, userId);
    }
  };

  dismissMessage = () => {
    this.setState({noEmpty: false});
  };

  handleSelectChange = (value) => {
    this.setState({ selectValue: value, noEmpty: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.selectValue !== '') {
      this.props.addUsersToGroup(this.state.selectValue, this.props.user.id);
      this.setState({ selectValue: '', noEmpty: false });
    }
  };

  handleDeleteUser = () => {
    this.props.deleteUser(this.props.user.id);
  };
}

User.propTypes = {
  groups: PropTypes.array,
  user: PropTypes.object,
  params: PropTypes.object,
  deleteUser: PropTypes.func,
  addUsersToGroup: PropTypes.func,
  removeUserFromGroup: PropTypes.func,
  goToUser: PropTypes.func
};

export default User;
