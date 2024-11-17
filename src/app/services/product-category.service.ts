import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { ProductCategory } from '../store/product-categories/product-category.model';
import { firstValueFrom } from 'rxjs';

@Injectable({providedIn:'root'})
export class ProductCategoryService {
  constructor(private http: HttpClientService) {}

  async saveProductCategory(productCategory: ProductCategory) {
    try {
      await firstValueFrom(this.http.post('productCategories', productCategory));
    } catch (e) {
      console.error('Failed to save product category', e);
      throw e;
    }
  }

  async getProductCategories(): Promise<ProductCategory[]> {
    try {
      return await firstValueFrom(this.http.get('productCategories'));
    } catch (e) {
      console.error('Failed to get product categories', e);
      throw e;
    }
  }
}
