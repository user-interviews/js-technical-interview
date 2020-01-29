import React from 'react';

import Project from '../../../models/project';

import ProjectsService from '../../../services/projects_service';

export default class ProjectPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      participants: [],
      project: undefined,
    };

    const projectId = props.match.params.project_id;

    Project.load(projectId).then(project => this.setState({ project }));
    ProjectsService.loadParticipantsForProject(projectId)
      .then(participants => this.setState({ participants }));
  }

  get participants() {
    return this.state.participants;
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

        {
          this.participants.length >= this.project.numParticipants ?
            <p>This project is <b>FULL</b></p> :
            <a href={`/projects/${this.project.id}/signup`}>Apply!</a>
        }
      </div>
    );
  }
}



