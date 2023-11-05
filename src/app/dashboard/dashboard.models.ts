import { Observable } from 'rxjs';

export interface Project {
  dateCreated: null | Date;
  startDate: null | Date;
  finalDate: null | Date;
  description: string;
  duration: number;
  id: string;
  status: string;
  tasks: string[];
  teamIds: string[];
  title: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  bio?: string;
  occupation?: string;
  avatar?: string;
  projects?: string[] | Project[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  membersIds: string[];
  duration: number;
  dateCreated: Date;
}

export const projectStatus = {
  ToDo: 'to-do',
  inProgress: 'in-progress',
  finished: 'finished',
};
