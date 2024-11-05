import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor() {}

  async getCurrencies() {
    try {
      return null;
    } catch (e) {
      console.error('Failed to load currencies', e);
      throw e;
    }
  }
}
