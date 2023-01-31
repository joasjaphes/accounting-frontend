import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { SharedModule } from '../../shared/shared.module';
import { AssetsComponent } from './assets/assets.component';
import { LiabilitiesComponent } from './liabilities/liabilities.component';
import { ShareHolderEquityComponent } from './share-holder-equity/share-holder-equity.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { IncomeComponent } from './income/income.component';
import { AddEditAccountComponent } from './accounts-list/add-edit-account/add-edit-account.component';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    AccountsComponent,
    AssetsComponent,
    LiabilitiesComponent,
    ShareHolderEquityComponent,
    ExpensesComponent,
    IncomeComponent,
    AddEditAccountComponent,
    AccountsListComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class AccountsModule { }
