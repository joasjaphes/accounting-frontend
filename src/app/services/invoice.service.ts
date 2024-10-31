import { Injectable } from '@angular/core';
import { Invoice } from '../store/invoicing/invoice.model';
import { HttpClientService } from './http-client.service';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClientService) {}

  async saveInvoice(invoice: Invoice) {
    return await firstValueFrom(this.http.post('invoices', invoice));
  }

  async getInvoices() {
    return await firstValueFrom(this.http.get('invoices'));
  }
}
