import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { firstValueFrom } from 'rxjs';
import { Currency } from '../store/currency/currency.model';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClientService) {}

  async getCurrencies() {
    try {
      return await firstValueFrom(this.http.get('currencies'));
    } catch (e) {
      console.error('Failed to load currencies', e);
      throw e;
    }
  }

  async saveCurrency(currency: Currency) {
    try {
      await firstValueFrom(this.http.post('currencies', currency));
    } catch (e) {
      console.error('Failed to save currency', e);
      throw e;
    }
  }
}
