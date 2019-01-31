import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { Observable, from } from 'rxjs';
import { map, take, concatAll } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
  }
}
