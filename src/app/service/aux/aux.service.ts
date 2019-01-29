import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { Observable, from } from 'rxjs';
import { map, take, concatAll } from 'rxjs/operators';
import { AjaxObservable, AjaxResponse } from 'rxjs/internal/observable/dom/AjaxObservable';
import { Annoncement } from './annoncement';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Config } from '../../config';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuxService {
  constructor(private http: HttpClient) { }
  getAnnouncements$(): Observable<any> {
    const annonuncements$ =
      ajax({
        url: environment.baseUrl + '/v2/report/announcement.jso',
        body: { type: 1 },
        headers: {
        },
        method: 'POST',
        crossDomain: true
      }).pipe(
        map(ajaxRsp => from(ajaxRsp.response.data).pipe(take(10))),
        concatAll()
      );
    return annonuncements$;
  }
  //计算两个时间相差（时间单位为秒）
  timeDiff(begin_time: number, now_time?: number): Object {
    if (!now_time) {
      now_time = (new Date().getTime() / 1000);
    }
    let _second = Math.round(begin_time - now_time);

    if (_second < 0) {
      return null;
    }
    let _day = _second / (24 * 60 * 60);
    _day = Math.floor(_day); 				//相差的总天数
    _second = _second - _day * 24 * 60 * 60; 	//抛去相差天数后的秒数
    let _hour = (_second / (60 * 60));
    _hour = Math.floor(_hour); 			    //相差的小时数
    _second = _second - _hour * 60 * 60;  	//抛去相差小时后的秒数
    let _min = _second / 60;
    _min = Math.floor(_min); 				//相差的分钟数
    _second = _second - _min * 60; 			//抛去相差分钟后的秒数
    const _sec = _second;
    const result = new Object();
    result['day'] = _day;
    result['hour'] = _hour;
    result['min'] = _min;
    result['sec'] = _sec;

    return result;
  }
  serverTime$(): Observable<Object> {
    return this.http.get(environment.baseUrl + '/dumy.txt?t=' + new Date().getTime(), { observe: 'response' }).pipe(
      map(resp => {
        if (resp.headers.has('Date')) {
          const date = new Date(resp.headers.get('Date'));
          return date.getTime() / 1000;
        } else {
          const date = new Date();
          return date.getTime() / 1000;
        }
      })
    );

    // http.
    // public get value() : string {
    //   return 
    // }

    // url: '/dumy.txt?t=' + new Date().getTime(),
    // type: 'GET',
    // success: function (result) {
    // },
    // complete: function (xhr, ts) {
    //     var date = new Date(xhr.getResponseHeader('Date'));
    //     var server_times = date.getTime() / 1000;//当前的时间戳
    //     callback(server_times);
    // }
  }
}
