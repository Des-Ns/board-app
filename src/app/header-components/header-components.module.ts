import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsTableComponent } from './projects-table/projects-table.component';

import { MaterialsModule } from '../materials.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ProjectsTableComponent],
  imports: [CommonModule, MaterialsModule, FlexLayoutModule],
  exports: [ProjectsTableComponent],
})
export class HeaderComponentsModule {}
