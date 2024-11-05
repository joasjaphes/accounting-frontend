import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccountsComponent } from './general-ledger/accounts/accounts.component';
import { TransactionComponent } from './general-ledger/transaction/transaction.component';
import { JournalEntryComponent } from './general-ledger/journal-entry/journal-entry.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products-and-services/products/products.component';
import { ServicesComponent } from './products-and-services/services/services.component';
import { InvoicingComponent } from './receivables/invoicing/invoicing.component';
import { CompanySetupComponent } from './configuration/company-setup/company-setup.component';
import { CurrencySetupComponent } from './configuration/currency-setup/currency-setup.component';
import { StoreSetupComponent } from './configuration/store-setup/store-setup.component';

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
        path: 'receivables/invoicing',
        component: InvoicingComponent,
      },
      {
        path: 'configuration/company-setup',
        component: CompanySetupComponent,
      },
      {
        path: 'configuration/currency-setup',
        component: CurrencySetupComponent,
      },
      {
        path: 'configuration/store-setup',
        component: StoreSetupComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'services',
        component: ServicesComponent,
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
