import React from 'react';

import ParticipantsService from '../../../services/participants_service';

export default class ParticipantsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { participants: [] };
  }

  get participants() {
    return this.state.participants;
  }

  loadParticipants() {
    ParticipantsService.loadParticipants().then(participants => {
      this.setState({ participants: [...this.state.participants, ...participants] });
    });
  }

  render() {
    this.loadParticipants();

    return (
      <div className="participants-page">
        <h1>Participants</h1>
        <ul>
          {
            this.participants.map(p => (
              <li>Participant {p.id}: {p.name}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}
