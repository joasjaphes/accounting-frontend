import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinancialStatementsComponent } from './financial-statements.component';

const routes: Routes = [{ path: '', component: FinancialStatementsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialStatementsRoutingModule { }
