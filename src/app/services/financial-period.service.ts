import { Injectable } from '@angular/core';
import { FinancialPeriod } from '../store/financial-period/financial-period.model';
import { HttpClientService } from './http-client.service';
import { firstValueFrom } from 'rxjs';

@Injectable({providedIn:'root'})
export class FinancialPeriodService {
  constructor(private http: HttpClientService) {}

  async saveFinancialPeriod(financialPeriod: FinancialPeriod) {
    try {
      await firstValueFrom(this.http.post('financialPeriods', financialPeriod));
    } catch (e) {
      console.error('Failed to save financial period', e);
      throw e;
    }
  }

  async getFinancialPeriods(): Promise<FinancialPeriod[]> {
    try {
      return await firstValueFrom(this.http.get('financialPeriods'));
    } catch (e) {
      console.error('Failed to get financial periods', e);
      throw e;
    }
  }
}
