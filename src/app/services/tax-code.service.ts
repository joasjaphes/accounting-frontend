import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { TaxCode } from '../store/tax-code/tax-code.model';
import { firstValueFrom } from 'rxjs';

@Injectable({providedIn:'root'})
export class TaxCodeService {
  constructor(private http: HttpClientService) {}

  async saveTaxCode(taxCode: TaxCode) {
    try {
      await firstValueFrom(this.http.post('taxCodes', taxCode));
    } catch (e) {
      console.error('Failed to save tax code', e);
      throw e;
    }
  }

  async getTaxCodes(): Promise<TaxCode[]> {
    try {
      return await firstValueFrom(this.http.get('taxCodes'));
    } catch (e) {
      console.error('Failed to get tax codes', e);
      throw e;
    }
  }
}
