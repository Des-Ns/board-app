import { Component, OnInit, Input } from '@angular/core';
import { RequestService } from '../../shared/request.service';
import { DashboardService } from '../dashboard.service';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { Member, Project, Task, projectStatus } from '../../shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  @Input() currProject!: Project;
  mainTeamMembers$!: Observable<Member[]>;
  projectTasks$!: Observable<Task[]>;

  title!: string;
  description!: string;

  constructor(
    private requestService: RequestService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.title = this.currProject.title;
    this.description = this.currProject.description;

    this.requestService.fetchMembers();
    this.mainTeamMembers$ = this.requestService.getProjectMembers(
      this.currProject.id
    );

    this.requestService.fetchTasks();
    this.projectTasks$ = this.requestService.getTasks(this.currProject.id);
  }

  openEditProjectDialog() {
    this.dashboardService.openProjectDialog(
      ProjectEditComponent,
      this.currProject
    );
    console.log(this.mainTeamMembers$);
  }

  onDeleteProject() {
    this.requestService.deleteProject(this.currProject.id).subscribe(() => {
      console.log('delete currProject =>', this.currProject);
      this.requestService.fetchProjects();
    });
  }

  onProjectStatusChange() {
    if (this.currProject.status === projectStatus.ToDo) {
      this.currProject.status = projectStatus.inProgress;
    } else if (this.currProject.status === projectStatus.inProgress) {
      this.currProject.status = projectStatus.finished;
    }
    this.requestService
      .patchProjectStatus(this.currProject, this.currProject.status)
      .subscribe(() => {
        this.requestService.fetchProjects();
      });
  }
}
