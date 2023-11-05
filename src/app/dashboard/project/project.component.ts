import { Component, OnInit, Input } from '@angular/core';
import { Member, Project, Task } from '../dashboard.models';
import { DashboardService } from '../dashboard.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Input() project!: Project;
  mainTeamMembers$!: Observable<Member[]>;
  projectTasks$!: Observable<Task[]>;

  title!: string;
  description!: string;
  // menuItem!: string[];
  // mainTeamMembers!: Members[];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.fetchMembers();
    this.mainTeamMembers$ = this.dashboardService.getProjectMembers(
      this.project.id
    );
    this.dashboardService.fetchTasks();
    this.projectTasks$ = this.dashboardService.getTasks(this.project.id);

    if (this.project) {
      this.title = this.project.title;
      this.description = this.project.description;
    }
  }
}
