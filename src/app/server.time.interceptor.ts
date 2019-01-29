import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map ,tap } from 'rxjs/operators';
/** Pass untouched request through to the next request handler. */
@Injectable()
export class ServerTimeInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event => {
      // There may be other events besides the response.
      if (event instanceof HttpResponse) {
        console.log(event.headers.keys());
      }
})
    );
    // const x = next.handle(req);

    // return x.pipe(
    //   // map(
    //   //   (y: HttpResponse<any>) => {
    //   //     const t = typeof y;
    //   //     console.log('type of event:' + t, y.headers);

    //   //     return y;
    //   //   }
    //   ));

    // return response;
  }
}
