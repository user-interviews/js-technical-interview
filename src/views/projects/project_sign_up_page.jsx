import React, { useState, useEffect } from 'react';

const ProjectSignupPage ({projectId}) => {
  const [projectParticipants, setProjectParticipants] = useState([])
  const [project, setProject] = useState(undefined)
  const [participant, setParticipant] = useState(undefined)

  useEffect(() => {
    const project = await fetch(`/api/projects/${participantId}`, {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'GET',
    });
    if (project) {
      setProject(project)
    }

    const participants = await fetch(`/api/projects/${projectId}/participants`, {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'GET',
    }).then(projectParticipants => setProjectParticipants(projectParticipants)

  },[])

  const loadByEmail = async (email) => {
    const response = await fetch(`/api/participants?email=${email}`, {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const responseJSON = await response.json();

    return responseJSON;
  }

  const submitForm = async () => {
    if (!participant.email) {
      window.alert('Please provide an email.');
      return;
    }

    const participant = await loadByEmail(participant.email);

    if (!participant || participant.password !== participant.password) {
      window.alert('Email and password do not match.');
      return;
    }

    if (projectParticipants.map(p => p.id).includes(participant.id)) {
      window.alert('You have already applied to this project!');
      return;
    }

    await fetch(`/projects/${project.id}/signup`, {
      body: { id:  participant.id },
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'POST',
    });

    props.history.push(`/projects/${project.id}`);
  }

  handleSubmitForm = (e) => {
    submitForm();

    e.preventDefault();
    return false;
  };

  handleUpdateEmail(e) {
    setParticipant({
      ...participant,
      email: e.target.value,
    });
  }

  handleUpdatePassword(e) {
    setParticipant({
      ...participant,
      password: e.target.value,
    });
  }

  return(
    <>
      {project === undefined && (
        <h1>Loading...</h1>;
        )
      }

      {projectParticipants.length >= project.numParticipants && (
        <h1>This project is FULL</h1>
      )}


      <div className="project-signup-page">
        <h1>{project.name}</h1>
        <form onSubmit={handleSubmitForm}>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              value={participant.email || ''}
              onChange={handleUpdateEmail}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              value={participant.password || ''}
              onChange={handleUpdatePassword}
            />
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </>
  )
}
