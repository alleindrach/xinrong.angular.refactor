import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, filter, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Config } from '../../config';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class InvestService {

  constructor(private http: HttpClient) { }
  getHotSection$(): Observable<any> {
    return this.http.get<JSON>(environment.baseUrl + '/v2/project/get_available_sectioin_by_surplus_money.jso', { observe: 'response' })
      .pipe(
        map(resp => {
          let date: Date;
          if (resp.headers.has('Date')) {
            date = new Date(resp.headers.get('Date'));
          } else {
            date = new Date();
          }
          const timeStamp = date.getTime() / 1000;

          resp.body['_timeStamp'] = timeStamp.toFixed(0);
          if (resp.body['data']) {
            resp.body['data']['amount'] = Number(resp.body['data']['amount']);
            resp.body['data']['raisedAmount'] = Number(resp.body['data']['raisedAmount']);
            resp.body['data']['stime'] = new Date().getTime() / 1000 + 60;
            resp.body['data']['flag'] = 0;
          }
          return resp.body;
        })
      );
    // catchError(this.handleError('getHotSection', []))
    // );
  }
  getTotalTransactionMoney$(): Observable<JSON> {
    return this.http.get<JSON>(environment.baseUrl + '/v2/transaction/total_transaction_money.jso').pipe(
      map(x => {
        x['allRetainTotal'] = parseFloat(x['accEarnBackTotal']) + parseFloat(x['accEarnTotal']);
        return x;
      }),
      catchError(this.handleError('getTotalTransactionMoney', null))
    );
  }
  getTransactionBatch$(): Observable<JSON> {
    return this.http.get<JSON>(environment.baseUrl + '/v2/transaction/summary_data.jso').pipe(
      // map(x => {
      //   x['allRetainTotal'] = parseFloat(x['accEarnBackTotal']) + parseFloat(x['accEarnTotal']);
      //   return x;
      // }),
      catchError(this.handleError('getTotalTransactionMoney', null))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
  }


  loanType2Name(loanType: number, conSn: string): string {
    let loanTypeStr = '';
    try {
      if (loanType === 1) {
        loanTypeStr = '信·无忧贷';
      } else if (loanType === 2) {
        loanTypeStr = '信·优企贷';
      } else if (loanType === 3) {
        loanTypeStr = '信·赎楼贷';
      } else if (loanType === 4 || loanType === 7 || loanType === 11) {
        loanTypeStr = '信·消费贷';
      } else if (loanType === 5) {
        loanTypeStr = '信·精选贷';
      } else if (loanType === 6) {
        loanTypeStr = '信·质抵贷';
      } else if (loanType === 8) {
        loanTypeStr = '品·融360';
      } else if (loanType === 9) {
        loanTypeStr = '品·吉屋网' + conSn.substring(3, 9) + '系列';
      } else if (loanType === 10) {
        loanTypeStr = '信·优资贷';
      } else if (loanType === 12) {
        loanTypeStr = '品·保理贷';
      } else if (loanType === 13) {
        loanTypeStr = '品·分期X';
      } else if (loanType === 14) {
        loanTypeStr = '信·消费JS';
      } else if (loanType === 15) {
        loanTypeStr = '品·票据贷';
      } else if (loanType === 16) {
        // let type_name = conSn.substring(1, 3);
        loanTypeStr = '信·车贷';
      } else if (loanType === 17) {
        loanTypeStr = '品·明特';
      }
    } catch (e) {
    }
    return loanTypeStr;
  }
}

