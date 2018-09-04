import React from 'react';
import { Redirect } from 'react-router-dom';

import { UserPropType } from '../../../lib/prop_types/users';

import './user_page.scss';

const UserPage = ({ user }) => {
  if (!user) {
    return <Redirect to="/"/>;
  }

  return (
    <div className="user-page">
      <h2>Hi {user.name}!</h2>
    </div>
  );
};

UserPage.propTypes = {
  user: UserPropType.isRequired,
};

export default UserPage;
