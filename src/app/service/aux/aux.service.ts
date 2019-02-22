import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { Observable, from } from 'rxjs';
import { map, take, concatAll } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var RSA: any;
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
  getServerTime$(): Observable<number> {
    return this.http.get(environment.baseUrl + '/dumy.txt?t=' + new Date().getTime(), { observe: 'response' }).pipe(
      map(resp => {
        if (resp.headers.has('Date')) {
          const date = new Date(resp.headers.get('Date'));
          return parseInt((date.getTime() / 1000).toString(), 10);
        } else {
          const date = new Date();
          return parseInt((date.getTime() / 1000).toString(), 10);
        }
      })
    );
  }
  encryptPw(password): String {
    const RSA_PUB_KEY_NUM = '10001';
    const RSA_PUB_MODULE = 'bafdbbf02c2da5125a921e59d4f5b3cdfb96172b8f75f2736b843ad78fb6d9cabc0fb64147c7b5a531f713123ff6dc33dc904f700a25c932e9a1d0bfdf5d3b609d6456c82922a54c75a085b0f117c7e1031acc33683895bf84b921acdd7df0f776694c3ef38d4cc27cd30feb4d90268179f5b1a789234f96cc14c70a2627f1a1';
    RSA.setMaxDigits(131);
    const key = new RSA.RSAKeyPair(// public,private,module
      RSA_PUB_KEY_NUM, '', RSA_PUB_MODULE
    );
    return RSA.encrypt(key, password);
  }
  login(): void {

  }
}
