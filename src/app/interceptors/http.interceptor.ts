import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const url = environment.server + 'api/' + request.url;
    const token = localStorage.getItem('accounting-token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    console.log('headers', request.headers);
    console.log('url', request.url);
    const req = request.clone({
      url,
      headers: request.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(req);
  }
}
