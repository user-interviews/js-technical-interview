import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ParticipantPage from './participant_page';
import ParticipantsPage from './participants_page';
import NewParticipantPage from './new_participant_page';

const ParticipantsRouter = ({ match }) => (
  <Switch>
    <Route
      path={`${match.url}`}
      component={ParticipantsPage}
    />
    <Route
      path={`${match.url}/new`}
      component={NewParticipantPage}
    />
    <Route
      path={`${match.url}/:participant_id`}
      component={ParticipantPage}
    />
  </Switch>
);

export default ParticipantsRouter;
