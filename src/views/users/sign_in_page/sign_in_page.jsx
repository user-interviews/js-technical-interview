import React from 'react';
import PropTypes from 'prop-types';

import './sign_in_page.scss';

const SignInPage = ({ onSignIn }) => (
  <div className="sign-in-page">
    <h1>Sign in</h1>
    <button onClick={onSignIn}>DO IT!</button>
  </div>
);

SignInPage.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

export default SignInPage;
