import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'formControl',
})
export class PipeFormControl implements PipeTransform {
  transform(value: AbstractControl): FormControl {
    return value as FormControl;
  }
}
