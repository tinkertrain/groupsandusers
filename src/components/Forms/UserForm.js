import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Select from 'react-select';
import cn from 'classnames';

import './ReactSelect.scss';
import styles from './Forms.scss';

class UserForm extends Component {
  state = {
    errors: {},
    selectValue: ''
  };

  componentDidMount() {
    this._name.focus();
  }

  render() {
    let { groups } = this.props;
    let { errors } = this.state;

    return (
      <form className={styles.Form} onSubmit={this.handleCreate}>
        <h2 className={styles['Form-Title']}>Add New User</h2>
        <div className={styles['Form-Item']}>
          {
            errors.name && (
              <div className={styles['Form-Error']}>
                Please enter a user name
              </div>
            )
          }
          <label
            className={styles['Form-Label']}
            htmlFor="UserName"
          >
            Name
          </label>
          <input
            className={cn(styles['Form-Input'], {
              [styles['Form-Input--error']]: errors.name
            })}
            id="UserName"
            placeholder="John Doe"
            ref={(c) => this._name = c}
            type="text"
          />
        </div>

        <div className={styles['Form-Item']}>
          {
            errors.groups && (
              <div className={styles['Form-Error']}>
                Please add the user to one or more groups
              </div>
            )
          }
          <label
            className={styles['Form-Label']}
          >
            Groups
          </label>
          <Select
            className={styles['Select-Users']}
            multi
            name="Groups"
            onChange={this.handleAddToGroup}
            options={groups.map((g) => ({value: g.id, label: g.name}))}
            placeholder="Add the user to one or more groups"
            simpleValue
            value={this.state.selectValue}
          />
        </div>

        <div className={cn(styles['Form-Item'], styles['Form-Item--actions'])}>
          <Link
            to="/users"
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
            Add
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
    else if (this.state.selectValue === '') {
      this.setState({
        errors: {
          ...this.state.errors,
          groups: true,
          name: name === ''
        }
      });
    }
    else {
      this.setState({
        errors: {}
      });

      this.props.create(name, this.state.selectValue);
    }
  };

  handleAddToGroup = (value) => {
    this.setState({ selectValue: value });
  };
}

UserForm.propTypes = {
  groups: PropTypes.array,
  create: PropTypes.func
};

export default UserForm;

