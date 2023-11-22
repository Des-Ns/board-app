import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toolTipList',
})
export class ToolTipListPipe implements PipeTransform {
  transform(lines: string[] | null): string {
    let list: string = '';

    if (!lines) {
      return '';
    }

    lines.forEach((line) => {
      list += ' ● ' + line + ' \n ';
    });

    return list;
  }
}
