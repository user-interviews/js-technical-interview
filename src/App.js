import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import SignInPage from './views/users/sign_in_page';

import './App.scss';

class AppContent extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav className="ui-app__navbar">
          <div className="ui-app__navbar__brand">
            <Link to="/">User Interviews</Link>
          </div>
          <ul>
            <li><Link to="/sign-in">Sign in</Link></li>
          </ul>
        </nav>
        <h1 className="ui-app__header">Hello World!</h1>

        <div className="ui-app__content">
          <Route path="/sign-in" component={SignInPage} />
        </div>
      </React.Fragment>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter className="ui-app">
        <AppContent />
      </BrowserRouter>
    );
  }
}
