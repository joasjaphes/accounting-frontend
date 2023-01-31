import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TableConfiguration } from '../../shared/components/data-table/tableconfiguration';
import { Transaction } from '../../store/models/transaction.model';
import { AppState } from '../../store/reducers';
import * as transactionSelector from '../../store/selectors/transaction.selectors';
import { AddEditTransactionComponent } from './add-edit-transaction/add-edit-transaction.component';

@Component({
  selector: 'accounting-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit {
  transactions$: Observable<Transaction[]>;
  tableConfigurations: TableConfiguration = {
    tableColumns: [
      { name: 'date', label: 'Transaction date' },
      { name: 'description', label: 'Description' },
      { name: 'status', label: 'Status' },
    ],
    actionIcons: {
      edit: true,
      isDelete: true,
      more: false,
    },
  };
  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.transactions$ = this.store.pipe(select(transactionSelector.selectAll));
  }

  onAdd() {
    this.dialog.open(AddEditTransactionComponent, {
      disableClose: true,
    });
  }

  onUpdate(event) {
    console.log('event', event);
    this.dialog.open(AddEditTransactionComponent, {
      disableClose: true,
      data: { currentTransaction: event },
    });
  }
}
