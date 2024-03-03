import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, ...filteredTexts: string[]): any {
    const filteredText = filteredTexts[0];
    const titleOfSearch = filteredTexts[1];
    if (
      value.length === 0 ||
      filteredText === undefined ||
      filteredText === ''
    ) {
      return value;
    }
    const newfilteredArray = [];
    for (const item of value) {
      if (item[titleOfSearch].toLowerCase().startsWith(filteredText)) {
        newfilteredArray.push(item);
      }
    }
    return newfilteredArray;
  }
}
