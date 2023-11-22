import { Component, OnInit, OnDestroy } from '@angular/core';

import { RequestService } from 'src/app/shared/request.service';
import { DashboardService } from '../dashboard.service';
import { ProjectCreateComponent } from '../project-create/project-create.component';
import { Project } from 'src/app/shared/models';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  toDoProjects$!: Observable<Project[]>;
  inProgressProjects$!: Observable<Project[]>;
  finishedProjects$!: Observable<Project[]>;

  constructor(
    private requestService: RequestService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.requestService.fetchProjects();

    this.toDoProjects$ = this.requestService.getToDoProjects();
    this.inProgressProjects$ = this.requestService.getInProgressProjects();
    this.finishedProjects$ = this.requestService.getFinishedProjects();
  }

  openCreateProjectDialog() {
    this.dashboardService.openProjectDialog(ProjectCreateComponent);
  }

  ngOnDestroy(): void {}
}
