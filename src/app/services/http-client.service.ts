import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment.config';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';
import { ServerService } from './server.service';

@Injectable({ providedIn: 'root' })
export class HttpClientService {
  environment = environment;
  configLoaded = false;
  serverUrl = '';
  constructor(private http: HttpClient, private serverService: ServerService) {}

  get rootUrl() {
    return this.serverService.rootUrl();
  }

  get authHeaders() {
    const token = localStorage.getItem('accounting-token');
    return {
      Authorization: `Basic ${token}`,
    };
  }

  get(url: string): Observable<any> {
    return this.rootUrl.pipe(
      mergeMap((root) =>
        this.http.get(`${root}/${url}`, { headers: this.authHeaders })
      )
    );
  }

  post(url: string, data) {
    return this.rootUrl.pipe(
      mergeMap((root) =>
        this.http.post(`${root}/${url}`, data, { headers: this.authHeaders })
      )
    );
  }

  put(url: string, data) {
    return this.rootUrl.pipe(
      mergeMap((root) =>
        this.http.put(`${root}/${url}`, data, { headers: this.authHeaders })
      )
    );
  }
}
