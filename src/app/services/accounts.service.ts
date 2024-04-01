import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Account } from '../store/accounts/account.model';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClientService) {}

  async saveAccount(account: Account) {
    try {
      await firstValueFrom(this.http.post('accounts', account));
    } catch (e) {
      console.error('Failed to save account', e);
      throw e;
    }
  }

  async getAccounts(): Promise<Account[]> {
    try {
      const accounts = await firstValueFrom(this.http.get('accounts'));
      return accounts as Account[];
    } catch (e) {
      console.error('Failed to get accounts', e);
      throw e;
    }
  }
}
