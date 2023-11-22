import { Component, Inject } from '@angular/core';
import { RequestService } from 'src/app/shared/request.service';
import { Project } from 'src/app/shared/models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectCreateComponent } from '../project-create/project-create.component';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
})
export class ProjectEditComponent {
  project!: Project;

  constructor(
    private requestService: RequestService,
    private matDialogRef: MatDialogRef<ProjectCreateComponent, any>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project }
  ) {
    if (data && data.project) {
      console.log(this.data.project);
      this.project = data.project as Project;
    }
  }

  onFormSubmit(project: Project) {
    this.requestService.putEditedProject(project).subscribe(() => {
      this.matDialogRef.close();
      this.requestService.fetchProjects();
    });
  }
}
