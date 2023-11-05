import { Injectable, OnDestroy } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
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
import { Member, Project } from '../dashboard/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class TeamService implements OnDestroy {
  // private members$ = new BehaviorSubject<any[]>([]);
  private project$ = new BehaviorSubject<Project[]>([]);
  projects$!: Observable<Project[]>;
  members$!: Observable<Member[]>;
  membersSub$!: Subscription;

  members!: Member[];
  memberProjects: Project[] | undefined;
  memberId!: number;

  constructor(private dashboardService: DashboardService) {}

  getProjects() {
    this.dashboardService.fetchProjects();
    this.projects$ = this.dashboardService.getProjects();
    return this.projects$;
  }

  getMembers() {
    this.dashboardService.fetchMembers();
    this.members$ = this.dashboardService.getAllMembers();
    return this.members$;
  }

  ngOnDestroy(): void {
    if (this.membersSub$) {
      this.membersSub$.unsubscribe();
    }
  }
}
