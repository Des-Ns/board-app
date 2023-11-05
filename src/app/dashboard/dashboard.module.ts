import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsModule } from '../materials.module';
import { SharedModule } from '../shared/shared.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { NameExtractionPipe } from './name-extraction.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    ProjectComponent,
    TaskComponent,
    ProjectFormComponent,
    ProjectCreateComponent,
    NameExtractionPipe,
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [DashboardComponent, ProjectComponent, TaskComponent],
})
export class DashboardModule {}
