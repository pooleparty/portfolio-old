import skills from '../data/skills';
import projects from '../data/projects';
import experience from '../data/experience';
import contactInfo from '../data/contactInfo';

const db: IDatabase = {
  skills,
  projects,
  experience,
  contactInfo,
};

const getDatabase = () => db;

export default getDatabase;
