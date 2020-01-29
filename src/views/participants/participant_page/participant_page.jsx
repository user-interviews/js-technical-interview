import React from 'react';

import Participant from '../../../models/participant';
import Project from '../../../models/project';

import ProjectsService from '../../../services/projects_service';

export default class ParticipantPage extends React.Component {
  constructor(props) {
    super(props);

    const participantId = props.match.params.participant_id;

    this.state = {
      participant: {},
      projects: [],
    };

    Participant.load(participantId).then(p => this.setState({ participant: p }));
    ProjectsService.getProjectIdsForParticipant(participantId)
      .then(projectIds => {
        projectIds.map(projectId => {
          Project.load(projectId).then(p => this.setState({ projects: [...this.state.projects, p ]}));
        });
      })
  }

  get participant() {
    return this.state.participant;
  }

  render() {
    return (
      <div className="participant-page">
        <h1>Participant #{this.participant.id}</h1>
        <p><b>Name:</b> {this.participant.name}</p>
        <p><b>Email:</b> {this.participant.email}</p>
        <p><b>Password:</b> {this.participant.password}</p>

        <h2>Current projects</h2>
        <ul>
          {this.state.projects.map((p, i) => <li key={i}>Project #{p.id}</li>)}
        </ul>
      </div>
    );
  }
}
