import { Pipe, PipeTransform } from '@angular/core';
import { Utilities} from '../../common/utilities';
@Pipe({
  name: 'loantype2name'
})
export class Loantype2namePipe implements PipeTransform {
  constructor() {

  }
  transform(value: number, args?: any): string {
    return Utilities.loanType2Name(value, null);
  }

}
