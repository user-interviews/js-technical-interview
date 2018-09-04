import React from 'react';
import { Route, Switch} from 'react-router-dom';

import NewProjectPage from './new_project_page';
import ProjectPage from './project_page';

const ProjectsRouter = ({ match }) => (
  <Switch>
    <Route
      path={`${match.url}/new`}
      component={NewProjectPage}
    />
    <Route
      path={`${match.url}/:project_id`}
      component={ProjectPage}
    />
  </Switch>
);

export default ProjectsRouter;
