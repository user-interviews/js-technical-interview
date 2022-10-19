import React, { useState, useEffect } from 'react';

const ParticipantPage = ({participantId}) => {
  const [participant, setParticipant] = useState({})
  const [projects, setProjects] = useState([])

  const fetchParticipants = async (participantId) => {
    const response = await fetch(`/api/participants/${participant_id}`, {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'GET',
    });
    await response.json();
  }

  const fetchProjects = async () => {
    const projectsResponse = await fetch(`/api/projects?participant_id=${participantId}`, {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'GET',
    });
    await projectsResponse.json();
  }

  const fetchProject = async (projectId) => {
    const project = await fetch(`/api/projects/${participantId}`, {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'GET',
    });
    await project.json();
  }

  useEffect(() => {
    fetchParticipants(participantId).then(p => setParticipant(p));

    fetchProjects().then(projectIds => projectIds.map(projectId => {
      fetchProject(projectId).then(p => setProjects({ projects: [...projects, p ]}));
    });

  }, []);

  return (
    <div className="participant-page">
      <h1>Participant #{participant.id}</h1>
      <p><b>Name:</b> {participant.name}</p>
      <p><b>Email:</b> {participant.email}</p>
      <p><b>Password:</b> {participant.password}</p>

      <h2>Current projects</h2>
      <ul>
        {projects.map((p, i) => <li key={i}>Project #{p.id}</li>)}
      </ul>
    </div>
  );
}
