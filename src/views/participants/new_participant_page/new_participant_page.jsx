import React from 'react';

import Participant from '../../../models/participant';

export default class NewParticipantPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { participant: {} };
  }

  get participant() {
    return new Participant(this.state.participant);
  }

  handleSubmitForm = (e) => {
    if (!this.state.participant.name) {
      window.alert('Please provide a name.');
    }

    if (!this.state.participant.email) {
      window.alert('Please provide an email.');
    }

    if (!this.state.participant.password || this.state.participant.password.length < 6) {
      window.alert('Please provide a password.');
    }

    if (Participant.loadByEmail(this.state.participant.email).id !== undefined) {
      window.alert('This email has already been taken.');
    }

    Participant.save(this.participant)
      .then(participant => {
        this.props.history.push(`/participants/${participant.id}`);
      });

    e.preventDefault();
    return false;
  };

  render() {
    return (
      <div className="new-participant-page">
        <h1>New Participant!</h1>
        <form onSubmit={this.handleSubmitForm}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={this.state.participant.name || ''}
              onChange={(e) => { this.setState({ participant: { ...this.state.participant, name: e.target.value } }) } }
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={this.state.participant.email || ''}
              onChange={(e) => { this.setState({ participant: { ...this.state.participant, email: e.target.value } }) } }
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              value={this.state.participant.password || ''}
              onChange={(e) => { this.setState({ participant: { ...this.state.participant, password: e.target.value } }) } }
            />
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    );
  }
}
