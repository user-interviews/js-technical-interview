import React from 'react';

import Project from '../../../models/project';

export default class NewProjectPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { project: {} };
  }

  get project() {
    return new Project(this.state.project);
  }

  updateProject(key, value) {
    this.setState({
      project: {
        ...this.state.project,
        [key]: value,
      },
    });
  }

  handleFormSubmit = (e) => {
    Project.save(this.project).then(project => this.props.history.push(`/projects/${project.id}`));

    e.preventDefault();
    return false;
  };

  handleChangeName = (e) => {
    this.updateProject('name', e.target.value);
  };

  handleChangeNumParticipants = (e) => {
    this.updateProject('numParticipants', e.target.value);
  };

  handleChangeTitle = (e) => {
    this.updateProject('title', e.target.value);
  };

  render() {
    return (
      <div className="new-project-page">
        <h1>New Project!</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={this.state.project.name || ''}
              onChange={this.handleChangeName}
            />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              name="title"
              value={this.state.project.title || ''}
              onChange={this.handleChangeTitle}
            />
          </div>
          <div className="form-group">
            <label>Number of Participants</label>
            <input
              name="numParticipants"
              value={this.state.project.numParticipants || ''}
              onChange={this.handleChangeNumParticipants}
            />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}
