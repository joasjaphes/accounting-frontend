import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment.config';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpClientService {
  environment = environment;
  constructor(private http: HttpClient) {}

  get rootUrl() {
    return environment.server_url;
  }

  get authHeaders() {
    const token = localStorage.getItem('accounting-token');
    return {
      Authorization: `Basic ${token}`,
    };
  }

  get(url: string): Observable<any> {
    return this.http.get(`${this.rootUrl}${url}`, {
      headers: this.authHeaders,
    });
  }

  post(url: string, data) {
    return this.http.post(`${this.rootUrl}${url}`, data, {
      headers: this.authHeaders,
    });
  }
}
