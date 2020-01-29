import React from 'react';

import Participant from '../../../models/participant';
import Project from '../../../models/project';
import ProjectsService from '../../../services/projects_service';


export default class ProjectSignupPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      participant: {},
      project: undefined,
      projectParticipants: [],
    };

    const projectId = props.match.params.project_id;

    Project.load(projectId).then(project => this.setState({ project }));
    ProjectsService.loadParticipantsForProject(projectId).then(projectParticipants => this.setState({ projectParticipants }));
  }

  get participant() {
    return new Participant(this.state.participant);
  }

  get project() {
    return this.state.project;
  }

  get projectParticipants() {
    return this.state.projectParticipants;
  }

  async submitForm() {
    if (!this.participant.email) {
      window.alert('Please provide an email.');
      return;
    }

    const participant = await Participant.loadByEmail(this.participant.email);

    if (!participant || participant.password !== this.participant.password) {
      window.alert('Email and password do not match.');
      return;
    }

    if (this.projectParticipants.map(p => p.id).includes(participant.id)) {
      window.alert('You have already applied to this project!');
      return;
    }

    await fetch(`/projects/${this.project.id}/signup`, {
      body: { id:  this.participant.id },
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'POST',
    });

    this.props.history.push(`/projects/${this.project.id}`);
  }

  handleSubmitForm = (e) => {
    this.submitForm();

    e.preventDefault();
    return false;
  };

  handleUpdateEmail(e) {
    this.setState({
      participant: {
        ...this.state.participant,
        email: e.target.value,
      },
    });
  }

  handleUpdatePassword(e) {
    this.setState({
      participant: {
        ...this.state.participant,
        password: e.target.value,
      },
    });
  }

  render() {
    if (this.project === undefined) {
      return <h1>Loading...</h1>;
    }

    if (this.projectParticipants.length >= this.project.numParticipants) {
      return <h1>This project is FULL</h1>;
    }

    return (
      <div className="project-signup-page">
        <h1>{this.project.name}</h1>
        <form onSubmit={this.handleSubmitForm}>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={this.state.participant.email || ''}
              onChange={this.handleUpdateEmail}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              value={this.state.participant.password || ''}
              onChange={this.handleUpdatePassword}
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
}
