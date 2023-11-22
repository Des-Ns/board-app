import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-table-dialog',
  templateUrl: './project-table-dialog.component.html',
  styleUrls: ['./project-table-dialog.component.css'],
})
export class ProjectTableDialogComponent {
  title!: string;
  content!: string;
  constructor(
    public dialogRef: MatDialogRef<ProjectTableDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.content = data.content;
  }
}
