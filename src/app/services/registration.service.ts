import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
  constructor(private http: HttpClientService) {}

  async registerUser(user) {
    return await firstValueFrom(this.http.post('users', user));
  }

  async registerCompany(company) {
    return await firstValueFrom(this.http.post('companies', company));
  }
}
