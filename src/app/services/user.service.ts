import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { firstValueFrom } from 'rxjs';
import { Buffer } from 'buffer';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClientService) {}

  async login(credentials: { username: string; password: string }) {
    const user = await firstValueFrom(
      this.http.post('users/signin', credentials)
    );
    const token = this.getToken(credentials.username, credentials.password);
    localStorage.setItem('accounting-token', token);
    localStorage.setItem('accounting-user', JSON.stringify(user));
    localStorage.setItem('accounting-company', JSON.stringify(user['company']));
    return user;
  }

  logout() {
    localStorage.removeItem('accounting-token');
    localStorage.removeItem('accounting-user');
  }

  getToken(username, password) {
    return Buffer.from(`${username}:${password}`, 'binary').toString('base64');
  }
}
