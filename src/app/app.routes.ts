import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccountsComponent } from './general-ledger/accounts/accounts.component';
import { TransactionComponent } from './general-ledger/transaction/transaction.component';
import { JournalEntryComponent } from './general-ledger/journal-entry/journal-entry.component';
import { CustomersComponent } from './customers/customers.component';

export const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: AccountsComponent,
      },
      {
        path: 'general-ledger/accounts',
        component: AccountsComponent,
      },
      {
        path: 'general-ledger/transactions',
        component: TransactionComponent,
      },
      {
        path: 'general-ledger/journal-entry',
        component: JournalEntryComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
    ],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
