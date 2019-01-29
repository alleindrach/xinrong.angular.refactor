import { Pipe, PipeTransform } from '@angular/core';
import { InvestService } from './invest.service';

@Pipe({
  name: 'loantype2name'
})
export class Loantype2namePipe implements PipeTransform {
  constructor(private investService: InvestService) {

  }
  transform(value: number, args?: any): string {
    return this.investService.loanType2Name(value, null);
  }

}
