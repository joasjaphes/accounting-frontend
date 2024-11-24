import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccountsComponent } from './modules/general-ledger/accounts/accounts.component';
import { TransactionComponent } from './modules/general-ledger/transaction/transaction.component';
import { JournalEntryComponent } from './modules/general-ledger/journal-entry/journal-entry.component';
import { CustomersComponent } from './modules/customers/customers.component';
import { ProductsComponent } from './modules/products-and-services/products/products.component';
import { ServicesComponent } from './modules/products-and-services/services/services.component';
import { InvoicingComponent } from './modules/receivables/invoicing/invoicing.component';
import { CompanySetupComponent } from './modules/configuration/company-setup/company-setup.component';
import { CurrencySetupComponent } from './modules/configuration/currency-setup/currency-setup.component';
import { StoreSetupComponent } from './modules/configuration/store-setup/store-setup.component';
import { TaxCodeComponent } from './modules/configuration/tax-code/tax-code.component';
import { PaymentTypeComponent } from './modules/configuration/payment-type/payment-type.component';
import { FinancialPeriodComponent } from './modules/configuration/financial-period/financial-period.component';
import { ProductCategoriesComponent } from './modules/configuration/product-categories/product-categories.component';
import { PackagingComponent } from './modules/configuration/packaging/packaging.component';
import { BinLocationComponent } from './modules/configuration/bin-location/bin-location.component';
import { PriceCategoriesComponent } from './modules/configuration/price-categories/price-categories.component';

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
        path: 'configuration/tax-code',
        component: TaxCodeComponent,
      },
      {
        path: 'configuration/payment-type',
        component: PaymentTypeComponent,
      },
      {
        path: 'configuration/financial-period',
        component: FinancialPeriodComponent,
      },
      {
        path: 'configuration/product-category',
        component: ProductCategoriesComponent,
      },
      {
        path: 'configuration/price-category',
        component: PriceCategoriesComponent,
      },
      {
        path: 'configuration/packaging',
        component: PackagingComponent,
      },
      {
        path: 'configuration/bin-location',
        component: BinLocationComponent,
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
