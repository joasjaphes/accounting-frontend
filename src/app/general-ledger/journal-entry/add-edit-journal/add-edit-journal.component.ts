import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Account } from '../../../store/accounts/account.model';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../store';
import * as accountSelector from '../../../store/accounts/accounts.selectors';
import { JournalTransaction } from '../../../store/journal-entry/journal-entry.model';
import { CommonService } from '../../../services/common.service';
@Component({
  selector: 'app-add-edit-journal',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatDatepickerModule,
    MatIcon,
    FormsModule,
    MatSuffix,
    MatLabel,
    NgIf,
    NgFor,
  ],
  templateUrl: './add-edit-journal.component.html',
  styleUrl: './add-edit-journal.component.css',
  animations: [],
})
export class AddEditJournalComponent implements OnInit {
  maxDate = new Date();
  journalDate;
  journalDescription: string;
  accounts$: Observable<Account[]>;
  transactions: JournalTransaction[] = [];
  newTransaction: JournalTransaction;
  constructor(
    private store: Store<AppState>,
    private commonService: CommonService
  ) {}
  ngOnInit(): void {
    this.accounts$ = this.store.pipe(select(accountSelector.selectAllAccounts));
  }

  resetJournalTransaction() {
    this.newTransaction = {
      id: this.commonService.makeId(),
      accountId: '',
      amount: 0,
      type: null,
    };
  }
}
