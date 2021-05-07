import Participant from '../models/participant';

export default class ParticipantsService {
  static async loadParticipants() {
    const response = await fetch('/api/participants', {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const responseJSON = await response.json();

    return responseJSON.map(participantJSON => new Participant(participantJSON));
  }
}
