import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import * as actions from '../../actions';

import styles from './HomePage.scss';

class HomePage extends Component {
  render() {
    const { groups } = this.props;

    return (
      <div>
        {
          groups.length === 0 ?
            this.renderGreeting(true) :
            this.renderGreeting(false)
        }
      </div>
    );
  }

  renderGreeting = (empty) => {
    if (empty) {
      return (
        <div className={styles['Home-Container']}>
          <p className={styles['Greeting-Big']}>Hi Admin!</p>
          <p>
            Looks like there are no groups, to get started <br/>
            why not create some?
          </p>
          <Link className={styles['Home-Link']}to="/groups/create">Create Group</Link>
        </div>
      );
    }
    return (
      <div>
        <p className={styles['Greeting-Big']}>Hi Admin!</p>
        <p>
          With this interface you can manage users and groups
        </p>
        <Link className={styles['Home-Link']}to="/groups">See Groups</Link>
        <Link className={styles['Home-Link']}to="/users">See Users</Link>
      </div>
    );
  };

}

HomePage.propTypes = {
  users: PropTypes.array,
  groups: PropTypes.array
};

let mapStateToProps = ({users, groups}) => {
  return {
    users,
    groups
  };
};

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

