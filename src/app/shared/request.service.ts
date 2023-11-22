import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Member, Project, Task } from './models';

import { BehaviorSubject, Observable } from 'rxjs';
import { filter, find, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  rootUrl = 'http://localhost:3000';

  private projects$ = new BehaviorSubject<Project[]>([]);
  private members$ = new BehaviorSubject<Member[]>([]);
  private tasks$ = new BehaviorSubject<any>([]);

  constructor(private httpClient: HttpClient) {}

  //* PROJECTS ---------------------------------
  fetchProjects() {
    return this.httpClient
      .get<Project[]>(`${this.rootUrl}/projects`)
      .subscribe((projects: Project[]) => this.projects$.next(projects));
  }

  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  getToDoProjects(): Observable<Project[]> {
    return this.projects$.pipe(
      map((projects) =>
        projects.filter((project) => project.status === 'to-do')
      )
    );
  }

  getInProgressProjects(): Observable<Project[]> {
    return this.projects$.pipe(
      map((projects) =>
        projects.filter((project) => project.status === 'in-progress')
      )
    );
  }

  getFinishedProjects(): Observable<Project[]> {
    return this.projects$.pipe(
      map((projects) =>
        projects.filter((project) => project.status === 'finished')
      )
    );
  }

  postNewProject(project: Project) {
    console.log('post-NewProject => ', project);
    return this.httpClient.post(`${this.rootUrl}/projects`, project);
  }

  putEditedProject(project: Project) {
    console.log('put-EditedProject=>', project);
    return this.httpClient.put(
      `${this.rootUrl}/projects/${project.id}`,
      project
    );
  }

  patchProjectStatus(project: Project, newStatus: string) {
    console.log('patch-ProjectStatus  =>', newStatus);
    return this.httpClient.put(`${this.rootUrl}/projects/${project.id}`, {
      ...project,
      status: newStatus,
    });
  }

  deleteProject(projectId: string) {
    return this.httpClient.delete(`${this.rootUrl}/projects/${projectId}`);
  }

  //* MEMBERS------------------------------------
  fetchMembers() {
    return this.httpClient
      .get<Member[]>(`${this.rootUrl}/members`)
      .subscribe((members: Member[]) => this.members$.next(members));
  }

  getAllMembers() {
    return this.members$;
  }

  getProjectMembers(projectId: string): Observable<Member[]> {
    const project = this.projects$.value.find(
      (project: Project) => project.id === projectId
    );

    return this.members$.pipe(
      map((members) => {
        return members.filter((member) =>
          project?.teamIds?.includes(member.id)
        );
      })
    );
  }

  getMembersNamesIds(): Observable<
    { firstName: string; lastName: string; id: string }[]
  > {
    return this.members$.pipe(
      map((members) =>
        members.map((member) => ({
          firstName: member.firstName,
          lastName: member.lastName,
          id: member.id,
        }))
      )
    );
  }

  getMemberById(memberId: string): Observable<Member | undefined> {
    return this.members$.pipe(
      map((members) => members.find((member) => member.id === memberId))
    );
  }

  postNewMember(member: Member) {
    return this.httpClient.post(`${this.rootUrl}/members`, member);
  }

  putEditedMember(member: Member) {
    return this.httpClient.put(`${this.rootUrl}/members/${member.id}`, member);
  }

  deleteMember(memberId: string) {
    return this.httpClient.delete(`${this.rootUrl}/members/${memberId}`);
  }

  //* TASKS -------------------------------------
  fetchTasks() {
    return this.httpClient
      .get<Task[]>(`${this.rootUrl}/tasks`)
      .subscribe((tasks) => this.tasks$.next(tasks ? tasks : []));
  }

  getTasks(projectId: string): Observable<Task[]> {
    const project = this.projects$.value.find(
      (project) => project.id === projectId
    );

    return this.tasks$.pipe(
      map((tasks: Task[]) => {
        if (tasks) {
          return tasks.filter((task) => project!.tasks.includes(task.id));
        } else {
          return [];
        }
      })
    );
  }

  getTaskMembers(taskId: string): Observable<Member[]> {
    const task = this.tasks$.value.find((task: Task) => task.id === taskId);

    return this.members$.pipe(
      map((members) =>
        members.filter((member) => task?.members.includes(member.id))
      )
    );
  }
}
