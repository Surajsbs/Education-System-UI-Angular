import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';

import { Observable, throwError  } from 'rxjs';
import { tap, catchError  } from 'rxjs/operators';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {

        console.log("request intercepted successfully!");
        
        const customReq = request.clone({
            headers: request.headers.set('Content-Type', 'application/json')
        });

        // const customReq =  request.clone({
        //     headers: headers,
        //     observe: 'response'
        // });

        return next
            .handle(customReq)
            .pipe(
                tap((ev: HttpEvent<any>) => {
                if (ev instanceof HttpResponse) {
                    // console.log('processing response: ', ev);
                }}),
                catchError(response => {
                    if (response instanceof HttpErrorResponse) {
                    console.log('Processing http error', response);
                    }
                return throwError(response);
        }));
        
        return next.handle(request);
     }
}