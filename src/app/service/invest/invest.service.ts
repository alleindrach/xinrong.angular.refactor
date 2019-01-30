import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, filter, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Utilities } from '../../utilities';
import { environment } from 'src/environments/environment';
import { SectionList } from './section.list';
@Injectable({
  providedIn: 'root'
})
export class InvestService {
  static PrimarySection = 1;
  static SubprimeSection = 2;
  static EscrowDirSection = 3;
  static TongRenSection = 4;
  static TransferSection = 5;
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
  getSections$(type: number, page: number, size: number): Observable<SectionList> {
    let destUrl;
    switch (type) {
      case InvestService.PrimarySection:
        destUrl = environment.baseUrl + '/v2/project/obtain_big_section_list.jso';
        break;
      case InvestService.SubprimeSection:
        destUrl = environment.baseUrl + '/v2/project/obtain_small_section_list.jso';
        break;
      case InvestService.EscrowDirSection:
        destUrl = environment.baseUrl + '/v2/project/obtain_manual_escrow_section_list.jso';
        break;
      case InvestService.TongRenSection:
        destUrl = environment.baseUrl + '/v2/project/obtain_available_tongren_section_list.jso';
        break;
      case InvestService.TransferSection:
        destUrl = environment.baseUrl + '/v2/project/obtain_brand_section_list.jso';
        break;
      default:
        destUrl = environment.baseUrl + '/v2/project/obtain_big_section_list.jso';
    }
    return this.http.get<SectionList>(destUrl,
      {
        params: { 'pageSize': size.toString(), 'pageIndex': page.toString() }
      });

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
}

