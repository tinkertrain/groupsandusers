import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../containers/App';

// Pages
import HomePage from '../containers/pages/HomePage';
import UsersPage from '../containers/pages/UsersPage';
import GroupsPage from '../containers/pages/GroupsPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />

    <Route path="users" component={UsersPage} />
    <Route path="users/add" component={UsersPage} />
    <Route path="users/:id" component={UsersPage} />

    <Route path="groups" component={GroupsPage} />
    <Route path="groups/create" component={GroupsPage} />
    <Route path="groups/:id" component={GroupsPage} />
  </Route>
);
