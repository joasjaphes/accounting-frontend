import { Component, OnInit } from '@angular/core';
import { PageLayoutComponent } from '../../shared/components/page-layout/page-layout.component';
import { Observable } from 'rxjs';
import { Customer } from '../../store/customers/customer.model';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store';
import * as customersSelector from '../../store/customers/customer.selectors';
import {
  DataTableComponent,
  TableConfiguration,
} from '../../shared/components/data-table/data-table.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { AddEditCustomerComponent } from './add-edit-customer/add-edit-customer.component';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    PageLayoutComponent,
    DataTableComponent,
    AddEditCustomerComponent,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  customers$: Observable<Customer[]>;
  loading$: Observable<boolean>;
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        name: 'name',
        label: 'Customer name',
        type: 'text',
      },
      {
        name: 'address',
        label: 'Customer address',
        type: 'text',
      },
      {
        name: 'phoneNumber',
        label: 'Customer phone',
        type: 'text',
      },
      {
        name: 'email',
        label: 'Customer email',
        type: 'text',
      },
    ],
  };
  viewDetails = false;
  viewType;
  formTitle = '';
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.customers$ = this.store.pipe(select(customersSelector.selectAll));
    this.loading$ = this.store.pipe(select(customersSelector.selectLoading));
  }

  addCustomer() {
    this.viewType = 'add';
    this.formTitle = 'Add new customer';
    this.viewDetails = true;
  }

  closeForm() {
    this.viewDetails = false;
    this.formTitle = '';
    this.viewType = '';
  }
}
