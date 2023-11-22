import { Injectable } from '@angular/core';
import { RequestService } from '../shared/request.service';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  tap,
  map,
  filter,
  forkJoin,
  catchError,
  switchMap,
  of,
} from 'rxjs';
import { Member, Project } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class HeaderComponentsService {
  projects$!: Observable<Project[]>;
  members$!: Observable<Member[]>;

  members!: Member[];
  memberId!: number;

  constructor(private requestService: RequestService) {}

  getProjects() {
    this.requestService.fetchProjects();
    this.projects$ = this.requestService.getProjects();
    return this.projects$;
  }

  getMembers() {
    this.requestService.fetchMembers();
    this.members$ = this.requestService.getAllMembers();
    return this.members$;
  }
}
