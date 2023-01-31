import { Injectable } from '@angular/core';
import { Account } from '../store/models/account.model';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  path = 'accounts';
  constructor(private http: HttpClientService) { }

  saveAccount(account: Account) {
    try {
      return this.http.post(this.path, account);
    } catch (e) {
      throw e;
    }
  }

  getAllAccounts() {
    try {
      return this.http.get(this.path);
    } catch (e) {
      throw e;
    }
  }
}
