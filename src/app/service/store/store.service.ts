import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoodResult } from 'src/app/model/good.result';
import { httpInterceptorProviders } from 'src/app/app.module';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }
  getHotGoods$(): Observable<GoodResult> {
    return this.http.get<GoodResult>(environment.baseUrl + '/v2/gift/gift_list.jso',
      {
        params: { type: '-1', pageSize: '8', pageIndex: '0', channelVendor: '-1' }
      }
    );
  }
}
