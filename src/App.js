import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import User from './models/user';

import ParticipantsRouter from './views/participants/participants_router';
import ProjectsRouter from './views/projects/projects_router';
import RootPage from './views/static_pages/root_page';
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

  redirectTo(path, callback) {
    this.props.history.push(path);

    if (callback) {
      callback();
    }
  }

  redirectToAccount(callback) {
    this.redirectTo('/account', callback);
  }

  redirectToRoot(callback) {
    this.redirectTo('/', callback);
  }

  handleSignIn = () => {
    this.redirectToAccount(() => this.setState({
      user: new User({ id: 1, name: 'Bob' }),
    }));
  };

  handleSignOut = () => {
    this.redirectToRoot(() => this.setState({ user: undefined }));
  };

  renderHeaderLinks() {
    return (
      <ul>
        {
          this.currentUser &&
            <React.Fragment>
              <li><Link to="/participants">Participants</Link></li>
              <li><Link to="/account">{this.currentUser.name}</Link></li>
              <li><Link to="/projects/new">New Project</Link></li>
            </React.Fragment>
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
          <Switch>
            <Route
              path="/account"
              render={props => (
                <UserPage {...props} user={this.currentUser} />
              )}
            />
            <Route
              path="/participants"
              component={ParticipantsRouter}
            />
            <Route
              path="/projects"
              component={ProjectsRouter}
            />
            <Route
              path="/sign-in"
              render={props => (
                <SignInPage {...props} onSignIn={this.handleSignIn} />
              )}
            />
            <Route path="/" component={RootPage} />
          </Switch>
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
