import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutStr',
})
export class CutStrPipe implements PipeTransform {
  transform(value: any, limit: number) {
    return value.substr(0, limit) + '...';
  }
}
