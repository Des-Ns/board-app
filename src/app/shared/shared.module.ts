import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialsModule } from '../materials.module';

import { ModalComponent } from './modal/modal.component';
import { PipeFormControl } from './pipe-form-control';

@NgModule({
  declarations: [ModalComponent, PipeFormControl],
  imports: [CommonModule, MaterialsModule],
  exports: [ModalComponent, PipeFormControl],
})
export class SharedModule {}
