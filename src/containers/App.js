import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import styles from './app.scss';

function App({children, location}) {
  return (
    <div>
      <header className={styles['Header']}>
        <div className={styles['Header-Contents']}>
          <Link to="/">
            <div className={styles.Logo}>InterNations</div>
          </Link>
          <nav className={styles.Navigation}>
            <ul>
              <li className={styles['Navigation-Link']}>
                <Link className={styles.Link} to="/groups">Groups</Link>
              </li>
              <li className={styles['Navigation-Link']}>
                <Link className={styles.Link} to="/users">Users</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className={styles['Main-Section']}>
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  location: React.PropTypes.object,
  children: React.PropTypes.object
};

export default App;
