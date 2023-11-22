import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsTableComponent } from './projects-table/projects-table.component';

import { MaterialsModule } from '../materials.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectTableDialogComponent } from './project-table-dialog/project-table-dialog.component';

@NgModule({
  declarations: [ProjectsTableComponent, ProjectTableDialogComponent],
  imports: [CommonModule, MaterialsModule, FlexLayoutModule],
  exports: [ProjectsTableComponent],
})
export class HeaderComponentsModule {}
