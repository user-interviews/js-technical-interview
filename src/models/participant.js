export default class Participant {
  constructor({ id, email, name, password }) {
    this._id = id;
    this._email = email;
    this._name = name;
    this._password = password;
  }

  static async load(participant_id) {
    const response = await fetch(`/api/participants/${participant_id}`, {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const responseJSON = await response.json();

    return new Participant(responseJSON);
  }

  static async loadByEmail(email) {
    const response = await fetch(`/api/participants?email=${email}`, {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const responseJSON = await response.json();

    return new Participant(responseJSON);
  }

  static async save(participant) {
    const response = await fetch('/api/participants', {
      body: JSON.stringify({ name: participant.name }),
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const responseJSON = await response.json();

    return new Participant(responseJSON);
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get name() {
    return this._name;
  }

  get password() {
    return this._password;
  }
}
