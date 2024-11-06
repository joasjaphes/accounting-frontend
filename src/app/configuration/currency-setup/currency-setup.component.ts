import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddEditCustomerComponent } from '../../customers/add-edit-customer/add-edit-customer.component';
import {
  DataTableComponent,
  TableConfiguration,
} from '../../shared/components/data-table/data-table.component';
import { PageLayoutComponent } from '../../shared/components/page-layout/page-layout.component';
import { AppState } from '../../store';
import { Customer } from '../../store/customers/customer.model';
import { Currency } from '../../store/currency/currency.model';
import * as currencySelector from '../../store/currency/currency.selectors';
import { AddEditCurrencyComponent } from './add-edit-currency/add-edit-currency.component';

@Component({
  selector: 'app-currency-setup',
  standalone: true,
  imports: [
    PageLayoutComponent,
    DataTableComponent,
    AddEditCurrencyComponent,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './currency-setup.component.html',
  styleUrl: './currency-setup.component.scss',
})
export class CurrencySetupComponent implements OnInit {
  currencies$: Observable<Currency[]>;
  loading$: Observable<boolean>;
  tableConfiguration: TableConfiguration = {
    columns: [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
      },
      {
        name: 'description',
        label: 'Description',
        type: 'text',
      },
      {
        name: 'symbol',
        label: 'Symbol',
        type: 'text',
      },
    ],
    actions: {
      edit: true,
    },
  };
  viewDetails = false;
  viewType;
  formTitle = '';
  currentCurrency: Currency;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.currencies$ = this.store.pipe(select(currencySelector.selectAll));
    this.loading$ = this.store.pipe(select(currencySelector.selectLoading));
  }

  addCurrency() {
    this.viewType = 'add';
    this.formTitle = 'Add new currency';
    this.viewDetails = true;
  }

  updateCurrency(event) {
    this.currentCurrency = event;
    this.viewType = 'update';
    this.formTitle = 'Update currency';
    this.viewDetails = true;
  }

  closeForm() {
    this.viewDetails = false;
    this.formTitle = '';
    this.viewType = '';
  }
}
