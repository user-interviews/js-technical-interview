import React, { useState } from 'react';

const SignUp = () => {
  const [participant, setParticipant] = useState({})

  const loadByEmail = async (email) => {
    const response = await fetch(`/api/participants?email=${email}`, {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const responseJSON = await response.json();

    return responseJSON;
  }

  const saveParticipant = async (participant) => {
    const response = await fetch('/api/participants', {
      body: JSON.stringify({ name: participant.name }),
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const responseJSON = await response.json();

    return responseJSON;
  }

  const handleSubmitForm = (event) => {
    if (!participant.name) {
      window.alert('Please provide a name.');
    }

    if (!participant.email) {
      window.alert('Please provide an email.');
    }

    if (!participant.password || participant.password.length < 6) {
      window.alert('Please provide a password.');
    }

    if (loadByEmail(participant.email).id !== undefined) {
      window.alert('This email has already been taken.');
    }

    saveParticipant(participant)
      .then(participant => {
        props.history.push(`/participants/${participant.id}`);
      });

    event.preventDefault();
    return false;
  };

    return (
      <div className="new-participant-page">
        <h1>New Participant!</h1>
        <form onSubmit={handleSubmitForm}>
          <div className="form-group">
            <label>Name</label>
            <input
              name="name"
              value={participant.name || ''}
              onChange={(e) => { setParticipant({ participant: { ...participant, name: e.target.value } }) } }
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={participant.email || ''}
              onChange={(e) => { setParticipant({ participant: { ...participant, email: e.target.value } }) } }
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              value={participant.password || ''}
              onChange={(e) => { setParticipant({ participant: { ...participant, password: e.target.value } }) } }
            />
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    );
}
export default SignUp;
