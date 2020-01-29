export default class ProjectsService {
  static async getProjectIdsForParticipant(participantId) {
    const response = await fetch(`/api/projects?participant_id=${participantId}`, {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'GET',
    });
    const responseJSON = await response.json();

    return responseJSON;
  }
}
