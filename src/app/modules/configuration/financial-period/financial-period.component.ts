import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataTableComponent, TableConfiguration } from '../../../shared/components/data-table/data-table.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { AddEditPaymentTypeComponent } from '../payment-type/add-edit-payment-type/add-edit-payment-type.component';
import { FinancialPeriod } from '../../../store/financial-period/financial-period.model';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import * as financialPeriodSelector from '../../../store/financial-period/financial-period.selectors';
import { AddEditFinancialPeriodComponent } from './add-edit-financial-period/add-edit-financial-period.component';

@Component({
  selector: 'app-financial-period',
  standalone: true,
  imports: [
    PageLayoutComponent,
    DataTableComponent,
    AsyncPipe,
    NgIf,
    AddEditFinancialPeriodComponent
 ],
  templateUrl: './financial-period.component.html',
  styleUrl: './financial-period.component.scss',
})
export class FinancialPeriodComponent implements OnInit {
  financialPeriods$: Observable<FinancialPeriod[]>;
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
        name: 'costingMethod',
        label: 'Costing method',
        type: 'text',
      },
      {
        name: 'startDate',
        label: 'Start date',
        type: 'date',
      },
      {
        name: 'endDate',
        label: 'End date',
        type: 'date',
      },
      {
        name: 'status',
        label: 'Status',
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
  currentFinancialPeriod: FinancialPeriod;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.financialPeriods$ = this.store.pipe(select(financialPeriodSelector.selectAll));
    this.loading$ = this.store.pipe(select(financialPeriodSelector.selectLoading));
  }

  addNewFinancialPeriod() {
    this.viewType = 'add';
    this.formTitle = 'Add new financial period';
    this.viewDetails = true;
  }

  updateFinancialPeriod(event) {
    this.currentFinancialPeriod = event;
    this.viewType = 'update';
    this.formTitle = 'Update financial period';
    this.viewDetails = true;
  }

  closeForm() {
    this.viewDetails = false;
    this.formTitle = '';
    this.viewType = '';
  }
}
