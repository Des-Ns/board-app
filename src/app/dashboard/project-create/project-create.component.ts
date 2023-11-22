import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../shared/request.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Project, projectStatus } from '../../shared/models';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css'],
})
export class ProjectCreateComponent implements OnInit {
  // provide default values for init of projectForm
  project: Project = {
    id: uuidv4(),
    title: '',
    description: '',
    teamIds: [],
    tasks: [],
    duration: 0,
    dateCreated: null,
    status: projectStatus.ToDo,
    startDate: null,
    finalDate: null,
  };

  constructor(
    private requestService: RequestService,
    private matDialogRef: MatDialogRef<ProjectCreateComponent, any>
  ) {}

  ngOnInit(): void {}

  onFormSubmit(project: Project) {
    this.requestService.postNewProject(project).subscribe(() => {
      this.matDialogRef.close();
      this.requestService.fetchProjects();
    });
  }
}
