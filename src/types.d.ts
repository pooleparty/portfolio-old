interface IDatabase {
  skills: DB.ISkill[];
  projects: DB.IProject[];
  experience: DB.IExperience[];
}

interface IContext {
  db: IDatabase;
}

declare namespace DB {
  interface ISkill {
    name: string;
    category: GQL.SkillCategory | string;
    logo: string;
  }

  interface IProject {
    name: string;
    description: string;
    link: string;
  }

  interface IExperience {
    title: string;
    description: string;
    company: string;
    location: string;
    startDate: any;
    endDate?: any | null;
  }
}
