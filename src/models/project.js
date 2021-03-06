export default class Project {
  constructor({ id, name, title, numParticipants } = {}) {
    this._id = id;
    this._name = name;
    this._numParticipants = numParticipants;
    this._title = title;
  }

  static load(id) {
    // STUBBED OUT
    return new Promise(resolve => {
      resolve(new Project({
        id,
        name: `Project ${id} [NAME]`,
        numParticipants: 10,
        title: `Project ${id} [TITLE]`,
      }));
    });
  }

  static save(project) {
    return new Promise(resolve => {
      project.id = Math.floor(Math.random() * 1000);
      resolve(project);
    });
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get numParticipants() {
    return this._numParticipants;
  }

  get title() {
    return this._title;
  }

  set id(id) {
    this._id = id;
  }
}
