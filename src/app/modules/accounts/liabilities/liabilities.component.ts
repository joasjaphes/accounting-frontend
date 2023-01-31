import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TableConfiguration } from '../../../shared/components/data-table/tableconfiguration';
import { Account } from '../../../store/models/account.model';
import { AppState } from '../../../store/reducers';
import { selectLiabilityAccounts } from '../../../store/selectors/account.selectors';
import { AccountCategory, accounts, accountsSubmenus } from '../accounts-categories';
import { AddEditAccountComponent } from '../accounts-list/add-edit-account/add-edit-account.component';

@Component({
  selector: 'accounting-liabilities',
  templateUrl: './liabilities.component.html',
  styleUrls: ['./liabilities.component.scss']
})
export class LiabilitiesComponent implements OnInit {
  tableConfigurations: TableConfiguration = {
    tableColumns: [
      { name: 'name', label: 'Account Name' },
      { name: 'balance', label: 'Account Balance' }
    ]
  };
  accounts$: Observable<Account[]>;
  menus = accountsSubmenus;

  constructor(private dialog: MatDialog, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.accounts$ = this.store.pipe(select(selectLiabilityAccounts));
  }

  onAdd() {
    this.dialog.open(AddEditAccountComponent, {
      disableClose: true,
      data: {
        title: 'liability',
        accountKey: AccountCategory.LIABILITY
      }
    });
  }

}
