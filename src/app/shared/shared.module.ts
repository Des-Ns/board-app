import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsModule } from '../materials.module';

import { FormControlPipe } from './pipes/form-control.pipe';
import { ToolTipListPipe } from './pipes/tool-tip-list.pipe';

@NgModule({
  declarations: [FormControlPipe, ToolTipListPipe],
  imports: [CommonModule, MaterialsModule],
  exports: [FormControlPipe, ToolTipListPipe],
})
export class SharedModule {}
