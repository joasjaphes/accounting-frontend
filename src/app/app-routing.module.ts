import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloadAllModules, Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeMessageComponent } from './welcome/welcome-message/welcome-message.component';
import { ClientDetailsComponent } from './welcome/client-details/client-details.component';

const routes: Route[] = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      {
        path: '',
        component: WelcomeMessageComponent,
      },
      {
        path: 'client-details',
        component: ClientDetailsComponent,
      },
    ],
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { state: 'dashboard' },
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { state: 'dashboard' },
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('./modules/accounts/accounts.module').then(
            (m) => m.AccountsModule
          ),
        data: { state: 'accounts' },
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./modules/transactions/transactions.module').then(
            (m) => m.TransactionsModule
          ),
      },

      {
        path: 'journal-entry',
        loadChildren: () =>
          import('./modules/journal-entry/journal-entry.module').then(
            (m) => m.JournalEntryModule
          ),
      },
      {
        path: 'financial-statements',
        loadChildren: () =>
          import(
            './modules/financial-statements/financial-statements.module'
          ).then((m) => m.FinancialStatementsModule),
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    data: { state: 'registration' },
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
