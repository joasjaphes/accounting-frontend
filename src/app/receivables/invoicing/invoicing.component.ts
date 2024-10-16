import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../shared/components/page-layout/page-layout.component';
import {
  DataTableComponent,
  TableConfiguration,
} from '../../shared/components/data-table/data-table.component';
import { Observable } from 'rxjs';
import { Invoice } from '../../store/invoicing/invoice.model';
import * as invoiceSelector from '../../store/invoicing/invoice.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store';
import { AsyncPipe } from '@angular/common';
import { AddEditInvoiceComponent } from './add-edit-invoice/add-edit-invoice.component';

@Component({
  selector: 'app-invoicing',
  standalone: true,
  imports: [
    PageLayoutComponent,
    DataTableComponent,
    AsyncPipe,
    AddEditInvoiceComponent,
  ],
  templateUrl: './invoicing.component.html',
  styleUrl: './invoicing.component.scss',
})
export class InvoicingComponent implements OnInit {
  viewDetails = false;
  formTitle = '';
  formDescription = '';
  viewType = '';
  invoices$: Observable<Invoice[]>;
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        name: 'invoiceNumber',
        label: 'Invoice number',
        type: 'text',
      },
      {
        name: 'date',
        label: 'Invoice date',
        type: 'date',
      },
      {
        name: 'customerName',
        label: 'Customer',
        type: 'text',
      },
      {
        name: 'description',
        label: 'Invoice description',
        type: 'text',
      },
      {
        name: 'itemList',
        label: 'Invoice Items',
        type: 'text',
      },
      {
        name: 'amount',
        label: 'Invoice amount',
        type: 'number',
      },
    ],
  };

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.invoices$ = this.store.pipe(select(invoiceSelector.selectAll));
  }

  closeForm() {
    this.viewDetails = false;
    this.formTitle = '';
    this.viewType = '';
  }

  onAddInvoice() {
    this.formTitle = 'Create new invoice';
    this.viewType = 'add';
    this.viewDetails = true;
  }
}
