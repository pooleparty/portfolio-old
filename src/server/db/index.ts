import skills from '../data/skills';
import projects from '../data/projects';
import experience from '../data/experience';

const db: IDatabase = {
  skills,
  projects,
  experience,
};

const getDatabase = () => db;

export default getDatabase;
