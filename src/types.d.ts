interface IDatabase {
  skills?: DB.ISkill[];
  projects?: DB.IProject[];
  experience?: DB.IExperience[];
  contactInfo?: DB.IContactInfo;
}

interface IContext {
  db: IDatabase;
}

declare namespace DB {
  interface ISkill {
    name: string;
    category: string;
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

  interface IContactInfo {
    email: string;
    github: string;
    linkedin: string;
  }
}
