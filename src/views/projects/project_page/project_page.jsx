import React from 'react';

import Project from '../../../models/project';

export default class ProjectPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { project: undefined };

    Project.load(props.match.params.project_id).then(project => this.setState({ project }));
  }

  get project() {
    return this.state.project;
  }

  render() {
    if (this.project === undefined) {
      return <h1>Loading...</h1>;
    }

    return (
      <div className="project-page">
        <h1>Project #{this.project.id}</h1>
        <p><b>Title:</b> {this.project.title}</p>
        <p><b>Name:</b> {this.project.name}</p>
        <p><b>Requested number of participants:</b> {this.project.numParticipants}</p>
      </div>
    );
  }
}



