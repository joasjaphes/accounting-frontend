import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions.component';
import { SharedModule } from '../../shared/shared.module';
import { AddEditTransactionComponent } from './add-edit-transaction/add-edit-transaction.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    TransactionsComponent,
    AddEditTransactionComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class TransactionsModule { 

}
