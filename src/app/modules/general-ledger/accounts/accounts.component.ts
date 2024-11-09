import { Component, OnInit } from '@angular/core';
import {
  DataTableComponent,
  TableConfiguration,
} from '../../../shared/components/data-table/data-table.component';
import { Observable } from 'rxjs';
import { Account } from '../../../store/accounts/account.model';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import * as accountSelectors from '../../../store/accounts/accounts.selectors';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { AddEditAccountComponent } from './add-edit-account/add-edit-account.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    PageLayoutComponent,
    DataTableComponent,
    AddEditAccountComponent,
    AsyncPipe,
  ],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css',
})
export class AccountsComponent implements OnInit {
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
        name: 'category',
        label: 'Account Type',
        type: 'text',
      },
    ],
  };
  accounts = [];
  viewDetails = false;
  formTitle = 'Add Account';
  formDescription = 'Add a new account';
  accounts$: Observable<Account[]>;
  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    console.log('AccountsComponent initialized');
    this.accounts$ = this.store.select(accountSelectors.selectAllAccounts);
  }

  addAccount() {
    this.viewDetails = true;
    console.log('Add Account');
  }

  closeForm() {
    this.viewDetails = false;
  }
}
