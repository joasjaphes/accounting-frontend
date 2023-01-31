import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';
import { AssetsComponent } from './assets/assets.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { IncomeComponent } from './income/income.component';
import { LiabilitiesComponent } from './liabilities/liabilities.component';
import { ShareHolderEquityComponent } from './share-holder-equity/share-holder-equity.component';

const routes: Routes = [
  {
    path:'',
    component:AccountsComponent
  },
  {
    path:'assets',
    component:AssetsComponent
  },
  {
    path:'liabilities',
    component:LiabilitiesComponent
  },
  {
    path:'share-holder-equity',
    component:ShareHolderEquityComponent
  },
  {
    path:'expenses',
    component:ExpensesComponent
  },
  {
    path:'income',
    component:IncomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
