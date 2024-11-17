import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  DataTableComponent,
  TableConfiguration,
} from '../../../shared/components/data-table/data-table.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { AddEditCurrencyComponent } from '../currency-setup/add-edit-currency/add-edit-currency.component';
import { Observable } from 'rxjs';
import { TaxCode } from '../../../store/tax-code/tax-code.model';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import * as taxCodeSelector from '../../../store/tax-code/tax-code.selectors';
import { AddEditTaxCodeComponent } from './add-edit-tax-code/add-edit-tax-code.component';
import * as accountSelector from '../../../store/accounts/accounts.selectors';
import { Account } from '../../../store/accounts/account.model';

@Component({
  selector: 'app-tax-code',
  standalone: true,
  imports: [
    PageLayoutComponent,
    DataTableComponent,
    AddEditCurrencyComponent,
    AsyncPipe,
    NgIf,
    AddEditTaxCodeComponent,
  ],
  templateUrl: './tax-code.component.html',
  styleUrl: './tax-code.component.scss',
})
export class TaxCodeComponent implements OnInit {
  taxCodes$: Observable<TaxCode[]>;
  loading$: Observable<boolean>;
  accounts$:Observable<Account[]>;
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
        name: 'rate',
        label: 'rate',
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
  currentTaxCode: TaxCode;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.taxCodes$ = this.store.pipe(select(taxCodeSelector.selectAll));
    this.loading$ = this.store.pipe(select(taxCodeSelector.selectLoading));
    this.accounts$ = this.store.pipe(select(accountSelector.selectAllAccounts))
  }

  addNewTaxCode() {
    this.viewType = 'add';
    this.formTitle = 'Add new tax code';
    this.viewDetails = true;
  }

  updateTaxCode(event) {
    this.currentTaxCode = event;
    this.viewType = 'update';
    this.formTitle = 'Update tax code';
    this.viewDetails = true;
  }

  closeForm() {
    this.viewDetails = false;
    this.formTitle = '';
    this.viewType = '';
  }
}
