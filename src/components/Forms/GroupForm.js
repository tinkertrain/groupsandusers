import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Select from 'react-select';
import cn from 'classnames';

import './ReactSelect.scss';
import styles from './Forms.scss';

class GroupForm extends Component {
  state = {
    errors: {},
    selectValue: ''
  };

  componentDidMount() {
    this._name.focus();
  }

  render() {
    let { users } = this.props;
    let { errors } = this.state;

    return (
      <form className={styles.Form} onSubmit={this.handleCreate}>
        <h2 className={styles['Form-Title']}>Create New Group</h2>
        <div className={styles['Form-Item']}>
          { errors.name && (
            <div className={styles['Form-Error']}>
              Please enter a name for your group
            </div>
          ) }
          <label
            className={styles['Form-Label']}
            htmlFor="GroupName"
          >
            Name
          </label>
          <input
            className={cn(styles['Form-Input'], {
              [styles['Form-Input--error']]: errors.name
            })}
            id="GroupName"
            placeholder="Group 1"
            ref={(c) => this._name = c}
            type="text"
          />
        </div>

        {
          users.length > 0 && (
            <div className={styles['Form-Item']}>
              <label
                className={styles['Form-Label']}
              >
                Users
              </label>
              <Select
                className={styles['Select-Users']}
                multi
                name="Users"
                onChange={this.handleAddUsersToGroup}
                options={users.map((u) => ({value: u.id, label: u.name}))}
                placeholder="Add users to this group"
                simpleValue
                value={this.state.selectValue}
              />
            </div>
          )
        }

        <div className={cn(styles['Form-Item'], styles['Form-Item--actions'])}>
          <Link
            to="/groups"
            className={cn(
              styles['Form-Button--cancel']
            )}
          >
            Cancel
          </Link>
          <button
            className={cn(
              styles['Form-Button'],
              styles['Form-Button--submit']
            )}
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    );
  }

  handleCreate = (e) => {
    e.preventDefault();

    let name = this._name.value.trim();

    if (name === '') {
      this.setState({
        errors: {...this.state.errors, name: true}
      });
    }
    else {
      this.setState({
        errors: {}
      });

      this.props.create(name, this.state.selectValue);
    }
  };

  handleAddUsersToGroup = (value) => {
    this.setState({ selectValue: value });
  };
}

GroupForm.propTypes = {
  users: PropTypes.array,
  create: PropTypes.func
};

export default GroupForm;

