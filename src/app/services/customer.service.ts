import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Customer } from '../store/customers/customer.model';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private http: HttpClientService) {}

  async saveCustomer(customer: Customer) {
    try {
      return await firstValueFrom(this.http.post('customers', customer));
    } catch (e) {
      console.error('Failed to save customer', e);
      throw e;
    }
  }

  async getCustomers(): Promise<Customer[]> {
    try {
      return await firstValueFrom(this.http.get('customers'));
    } catch (e) {
      console.error('Failed to load customers', e);
      throw e;
    }
  }
}
