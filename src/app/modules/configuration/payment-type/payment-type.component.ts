import { Component, OnInit } from '@angular/core';
import { AddEditPaymentTypeComponent } from './add-edit-payment-type/add-edit-payment-type.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { DataTableComponent, TableConfiguration } from '../../../shared/components/data-table/data-table.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { AddEditCurrencyComponent } from '../currency-setup/add-edit-currency/add-edit-currency.component';
import * as paymentTypeSelector from '../../../store/payment-type/payment-type.selectors';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../store';
import { Account } from '../../../store/accounts/account.model';
import { TaxCode } from '../../../store/tax-code/tax-code.model';
import { PaymentType } from '../../../store/payment-type/payment-type.model';

@Component({
  selector: 'app-payment-type',
  standalone: true,
  imports: [
    PageLayoutComponent,
    DataTableComponent,
    AsyncPipe,
    NgIf,
    AddEditPaymentTypeComponent,
  ],
  templateUrl: './payment-type.component.html',
  styleUrl: './payment-type.component.scss'
})
export class PaymentTypeComponent implements OnInit {
  paymentTypes$: Observable<PaymentType[]>;
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
    ],
    actions: {
      edit: true,
    },
  };
  viewDetails = false;
  viewType;
  formTitle = '';
  currentPaymentType: PaymentType;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.paymentTypes$ = this.store.pipe(select(paymentTypeSelector.selectAll));
    this.loading$ = this.store.pipe(select(paymentTypeSelector.selectLoading));
  }

  addNewPaymentType() {
    this.viewType = 'add';
    this.formTitle = 'Add new payment type';
    this.viewDetails = true;
  }

  updatePaymentType(event) {
    this.currentPaymentType = event;
    this.viewType = 'update';
    this.formTitle = 'Update payment type';
    this.viewDetails = true;
  }

  closeForm() {
    this.viewDetails = false;
    this.formTitle = '';
    this.viewType = '';
  }

}
