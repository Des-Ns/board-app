import { Injectable } from '@angular/core';

import { Project } from 'src/app/shared/models';
import { take, tap } from 'rxjs';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  projects!: Project[];

  constructor(private matDialog: MatDialog) {}

  //* CREATE || EDIT PROJECT - DIALOG
  openProjectDialog(component: any, project?: Project) {
    if (project !== undefined) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { project };
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';

      console.log(dialogConfig);
      const dialog = this.matDialog.open(component, dialogConfig);

      dialog
        .afterClosed()
        .pipe(take(1))
        .subscribe(() => {
          // Clean up resources or state here
        });
      return;
    }

    const dialog = this.matDialog.open(component, {
      autoFocus: true,
      width: '60%',
    });

    dialog
      .afterClosed()
      .pipe(take(1))
      .subscribe(() => {
        // Clean up resources or state here
      });
    return;
  }
}
