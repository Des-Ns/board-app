import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { Member, Project, Task } from './dashboard.models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
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
      (project) => project.id === projectId
    );

    return this.members$.pipe(
      map((members) =>
        members.filter((member) => project?.teamIds?.includes(member.id))
      )
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

  //* TASKS -------------------------------------
  fetchTasks() {
    return this.httpClient
      .get<Task[]>(`${this.rootUrl}/tasks`)
      .subscribe((tasks) => this.tasks$.next(tasks));
  }

  getTasks(projectId: string): Observable<Task[]> {
    const project = this.projects$.value.find(
      (project) => project.id === projectId
    );

    return this.tasks$.pipe(
      map((tasks: Task[]) =>
        tasks.filter((task) => project?.tasks.includes(task.id))
      )
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
