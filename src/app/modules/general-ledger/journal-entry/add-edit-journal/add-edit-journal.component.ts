import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, first, firstValueFrom } from 'rxjs';
import { Account } from '../../../../store/accounts/account.model';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../store';
import * as accountSelector from '../../../../store/accounts/accounts.selectors';
import {
  JournalEntry,
  JournalTransaction,
  TransactionType,
} from '../../../../store/journal-entry/journal-entry.model';
import { CommonService } from '../../../../services/common.service';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { SaveButtonComponent } from '../../../../shared/components/save-button/save-button.component';
import { JournalEntryService } from '../../../../services/journal-entry.service';
import moment from 'moment';
import { JournalEntryActions } from '../../../../store/journal-entry/journal-entry.actions';
@Component({
  selector: 'app-add-edit-journal',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatDatepickerModule,
    MatIcon,
    MatSelect,
    MatOption,
    FormsModule,
    ReactiveFormsModule,
    MatSuffix,
    MatLabel,
    MatButton,
    NgIf,
    NgFor,
    AsyncPipe,
    SaveButtonComponent,
  ],
  templateUrl: './add-edit-journal.component.html',
  styleUrl: './add-edit-journal.component.scss',
  animations: [],
})
export class AddEditJournalComponent implements OnInit {
  @Output() close = new EventEmitter();
  maxDate = new Date();
  journalDate;
  journalDescription: string;
  accounts$: Observable<Account[]>;
  transactions: JournalTransaction[] = [];
  newTransaction: JournalTransaction;
  saving = false;
  constructor(
    private store: Store<AppState>,
    private commonService: CommonService,
    private journalService: JournalEntryService
  ) {}
  ngOnInit(): void {
    this.accounts$ = this.store.pipe(select(accountSelector.selectAllAccounts));
    this.resetJournalTransaction();
  }

  resetJournalTransaction() {
    this.newTransaction = {
      id: this.commonService.makeId(),
      accountId: '',
      amount: 0,
      debitAmount: null,
      creditAmount: null,
      type: null,
      date: null,
    };
  }

  async addTransaction() {
    const account = await firstValueFrom(
      this.store.pipe(
        select(
          accountSelector.selectAccountById(this.newTransaction.accountId)
        ),
        first((i) => !!i)
      )
    );
    if (this.newTransaction.debitAmount) {
      this.newTransaction.amount = this.newTransaction.debitAmount;
      this.newTransaction.type = 'DEBIT';
    }
    if (this.newTransaction.creditAmount) {
      this.newTransaction.amount = this.newTransaction.creditAmount;
      this.newTransaction.type = 'CREDIT';
    }
    this.newTransaction.accountName = account.name;
    this.transactions.push(this.newTransaction);
    this.resetJournalTransaction();
  }

  async onSave() {
    this.saving = true;
    try {
      const journalId = this.commonService.makeId();
      const payload: JournalEntry = {
        id: journalId,
        date: moment(new Date(this.journalDate)).format('YYYY-MM-DD'),
        description: this.journalDescription,
        transactions: this.transactions.map((t) => {
          return {
            ...t,
            date: moment(new Date(this.journalDate)).format('YYYY-MM-DD'),
            journal: journalId,
          };
        }),
      };
      await this.journalService.saveJournal(payload);
      this.store.dispatch(
        JournalEntryActions.upsertJournalEntry({ journal: payload })
      );
      this.onClose();
    } catch (e) {
      console.error('Failed to save journal entry', e);
    }
    this.saving = false;
  }

  onClose() {
    this.close.emit();
  }
}
