import { Injectable } from '@angular/core';
import { Product } from '../store/products/product.model';
import { HttpClientService } from './http-client.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClientService) {}

  async saveProduct(product: Product) {
    try {
      await firstValueFrom(this.http.post('product', product));
    } catch (e) {
      console.error('Failed to save product', e);
      throw e;
    }
  }
  async getProducts() {
    try {
      return await firstValueFrom(this.http.get('product'));
    } catch (e) {
      console.error('Failed to get products', e);
      throw e;
    }
  }
}
