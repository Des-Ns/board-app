import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonePipe',
})
export class PhonePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/(\d{2})(\d{3})(\d{3})/, '0$1-$2-$3');
  }
}
