import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { firstValueFrom } from 'rxjs';
import { PriceCategory } from '../store/price-category/price-category.model';

@Injectable({ providedIn: 'root' })
export class PriceCategoryService {
  constructor(private http: HttpClientService) {}

  async savePriceCategory(priceCategory: PriceCategory) {
    try {
      await firstValueFrom(this.http.post('priceCategories', priceCategory));
    } catch (e) {
      console.error('Failed to save price categories', e);
      throw e;
    }
  }

  async getPriceCategories(): Promise<PriceCategory[]> {
    try {
      return await firstValueFrom(this.http.get('priceCategories'));
    } catch (e) {
      console.error('Failed to get price categories', e);
      throw e;
    }
  }
}
