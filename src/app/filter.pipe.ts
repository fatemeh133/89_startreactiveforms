import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filteredText: string): any {
    if (
      value.length === 0 ||
      filteredText === undefined ||
      filteredText === ''
    ) {
      return value;
    }
    const newfilteredArray = [];
    for (const item of value) {
      if (item.status === filteredText) {
        newfilteredArray.push(item);
        return newfilteredArray;
      }
    }
  }
}
