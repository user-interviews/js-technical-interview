import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import SignInPage from './views/users/sign_in_page';
import UserPage from './views/users/user_page';

import './App.scss';

class AppContent extends React.Component {
  constructor() {
    super();

    this.state = { user: undefined };
  }

  get currentUser() {
    return this.state.user;
  }

  redirectTo(path) {
    this.props.history.push(path);
  }

  redirectToRoot() {
    this.redirectTo('/')
  }

  handleSignIn = () => {
    this.setState(
      { user: { name: 'Bob' } },
      () => this.redirectToRoot(),
    );
  };

  handleSignOut = () => {
    this.setState(
      { user: undefined },
      () => this.redirectToRoot(),
    );
  };

  renderHeaderLinks() {
    return (
      <ul>
        {
          this.currentUser &&
            <li><Link to="/account">{this.currentUser.name}</Link></li>
        }
        {
          this.currentUser === undefined ?
            <li><Link to="/sign-in">Sign in</Link></li> :
            <li>
              <button className="btn-link" onClick={this.handleSignOut}>
                Sign out
              </button>
            </li>
        }
      </ul>
    );
  }

  render() {
    return (
      <React.Fragment>
        <nav className="ui-app__navbar">
          <div className="ui-app__navbar__brand">
            <Link to="/">User Interviews</Link>
          </div>
          {this.renderHeaderLinks()}
        </nav>
        <div className="ui-app__content">
          <Route
            path="/account"
            render={props => (
              <UserPage {...props} user={this.currentUser} />
            )}
          />
          <Route
            path="/sign-in"
            render={props => (
              <SignInPage {...props} onSignIn={this.handleSignIn} />
            )}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter className="ui-app">
        <Route path="/" component={AppContent} />
      </BrowserRouter>
    );
  }
}
