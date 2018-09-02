import React from 'react';

import { UserPropType } from '../../../lib/prop_types/users';

import './user_page.scss';

const UserPage = ({ user }) => (
  <div className="user-page">
    <h2>Hi {user.name}!</h2>
  </div>
);

UserPage.propTypes = {
  user: UserPropType.isRequired,
};

export default UserPage;
