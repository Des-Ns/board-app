import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameExtraction',
})
export class NameExtractionPipe implements PipeTransform {
  transform(value: any): string {
    if (value && value.firstName && value.lastName) {
      return `${value.firstName} ${value.lastName}`;
    }
    return '';
  }
}
