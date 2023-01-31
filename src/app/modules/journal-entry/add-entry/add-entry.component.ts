import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Transaction } from '../../../store/models/transaction.model';
import { AppState } from '../../../store/reducers';
import * as transactionSelector from '../../../store/selectors/transaction.selectors';
import * as accountSelector from '../../../store/selectors/account.selectors';
import { Account } from '../../../store/models/account.model';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'accounting-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.scss'],
})
export class AddEntryComponent implements OnInit {
  selectedTransactions: Transaction[] = [];
  transactions$: Observable<Transaction[]>;
  accounts$: Observable<Account[]>;
  journalAccounts: {
    id: string;
    debit: number;
    credit: number;
    accountId: string;
  }[] = [];
  currentJournalAccount = {
    id: '',
    debit: null,
    credit: null,
    accountId: '',
  };
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.transactions$ = this.store.pipe(
      select(transactionSelector.selectPendingTransactions)
    );
    this.accounts$ = this.store.pipe(select(accountSelector.selectAll));
  }

  onClose() {
    this.dialog.closeAll();
  }

  getDumyList() {
    return Array(5);
  }

  onSelectTransaction(transaction: Transaction) {
    if (this.isSelected(transaction.id)) {
      this.selectedTransactions = this.selectedTransactions.filter(
        (t) => t.id !== transaction.id
      );
    } else {
      this.selectedTransactions.push(transaction);
    }
  }

  isSelected(transactionId) {
    return this.selectedTransactions.map((t) => t.id).includes(transactionId);
  }

  addJournalAccount() {
    this.currentJournalAccount.id = this.commonService.makeId();
    this.journalAccounts.push(this.currentJournalAccount);
  }

  removeJournalAccount(id: string) {
    this.journalAccounts = this.journalAccounts.filter(
      (account) => account.id !== id
    );
  }

  save(){
    
  }
}
