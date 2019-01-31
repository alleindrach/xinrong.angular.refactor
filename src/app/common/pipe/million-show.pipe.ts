import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millionShow'
})
export class MillionShowPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    if (value > 1000000) {
      return '100+万元';
    } else {
      return Number(value).toFixed(2) + '元';
    }
  }

}
