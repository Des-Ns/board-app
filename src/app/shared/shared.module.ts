import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsModule } from '../materials.module';

import { FormControlPipe } from './form-control.pipe';
import { DialogTableComponent } from './dialog-table/dialog-table.component';

@NgModule({
  declarations: [FormControlPipe, DialogTableComponent],
  imports: [CommonModule, MaterialsModule],
  exports: [FormControlPipe],
})
export class SharedModule {}
