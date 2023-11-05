import { Component, OnInit } from '@angular/core';
import { Project, projectStatus } from '../dashboard.models';
import { v4 as uuidv4 } from 'uuid';
import { DashboardService } from '../dashboard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css'],
})
export class ProjectCreateComponent implements OnInit {
  showModal = false;
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

  constructor() {}

  ngOnInit(): void {}
}
