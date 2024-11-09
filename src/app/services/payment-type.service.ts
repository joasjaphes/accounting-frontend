import { Injectable } from '@angular/core';
import { FinancialPeriod } from '../store/financial-period/financial-period.model';
import { HttpClientService } from './http-client.service';
import { firstValueFrom } from 'rxjs';
import { PaymentType } from '../store/payment-type/payment-type.model';

@Injectable({ providedIn: 'root' })
export class PaymentTypeService {
  constructor(private http: HttpClientService) {}

  async savePaymentType(paymentType: PaymentType) {
    try {
      await firstValueFrom(this.http.post('paymentTypes', paymentType));
    } catch (e) {
      console.error('Failed to save payment type', e);
      throw e;
    }
  }

  async getPaymentTypes(): Promise<PaymentType[]> {
    try {
      return await firstValueFrom(this.http.get('paymentTypes'));
    } catch (e) {
      console.error('Failed to get payment types', e);
      throw e;
    }
  }
}
