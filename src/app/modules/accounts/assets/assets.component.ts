import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableConfiguration } from '../../../shared/components/data-table/tableconfiguration';
import {
  AccountCategory,
  accounts,
  accountsSubmenus,
} from '../accounts-categories';
import { AddEditAccountComponent } from '../accounts-list/add-edit-account/add-edit-account.component';
import * as accountSelector from '../../../store/selectors/account.selectors';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers';
import { Observable } from 'rxjs';
import { Account } from '../../../store/models/account.model';
import { ActionButton } from '../../../shared/components/data-table/action-button';

@Component({
  selector: 'accounting-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent implements OnInit {
  menus = accountsSubmenus;
  accounts$: Observable<Account[]>;
  tableConfigurations: TableConfiguration = {
    tableColumns: [
      { name: 'name', label: 'Account Name' },
      { name: 'balance', label: 'Account Balance' },
    ],
  };

  constructor(private dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.accounts$ = this.store.pipe(
      select(accountSelector.selectAssetAccounts)
    );
  }

  onAdd() {
    this.dialog.open(AddEditAccountComponent, {
      disableClose: true,
      data: {
        title: 'asset',
        accountKey: AccountCategory.ASSET,
      },
    });

    this.dialog.afterAllClosed.subscribe((observer) => {
      console.log('observer', observer);
    });
  }

  onUpdate(event) {
    this.dialog.open(AddEditAccountComponent, {
      disableClose: true,
      data: {
        title: 'asset',
        accountKey: AccountCategory.ASSET,
        currentAccount:event
      },
    });

    this.dialog.afterAllClosed.subscribe((observer) => {
      console.log('observer', observer);
    });
  }

  onClose() {}
}
