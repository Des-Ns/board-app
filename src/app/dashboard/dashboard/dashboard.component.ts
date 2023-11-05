import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Project } from '../dashboard.models';
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

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.fetchProjects();

    this.toDoProjects$ = this.dashboardService.getToDoProjects();
    this.inProgressProjects$ = this.dashboardService.getInProgressProjects();
    this.finishedProjects$ = this.dashboardService.getFinishedProjects();
  }

  show() {
    console.log(this.toDoProjects$);
    console.log(this.inProgressProjects$);
    console.log(this.finishedProjects$);
  }

  ngOnDestroy(): void {}
}
