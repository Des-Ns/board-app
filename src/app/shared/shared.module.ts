import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsModule } from '../materials.module';

import { FormControlPipe } from './pipes/form-control.pipe';
import { ToolTipListPipe } from './pipes/tool-tip-list.pipe';
import { PhonePipe } from './pipes/phone.pipe';

@NgModule({
  declarations: [FormControlPipe, ToolTipListPipe, PhonePipe],
  imports: [CommonModule, MaterialsModule],
  exports: [FormControlPipe, ToolTipListPipe, PhonePipe],
})
export class SharedModule {}
