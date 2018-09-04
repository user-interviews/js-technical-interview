import React from 'react';

import Project from '../../../models/project';

export default class ProjectPage extends React.Component {
  constructor(props) {
    super(props);

    const project_id = props.match.params.project_id;

    this.state = {
      project: Project.load(project_id),
    };
  }

  get project() {
    return this.state.project;
  }

  render() {
    return (
      <div className="project-page">
        <h1>Project #{this.project.id}</h1>
      </div>
    );
  }
}



