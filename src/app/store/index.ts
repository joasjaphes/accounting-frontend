import { ActionReducerMap } from '@ngrx/store';
import * as fromAccounts from './accounts/accounts.reducer';
import * as fromRouter from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import * as fromJournalEntry from './journal-entry/journal-entry.reducer';
import * as fromCustomer from './customers/customer.reducer';
import * as fromProduct from './products/product.reducer';
import * as fromInvoice from './invoicing/invoice.reducer';

export interface AppState {
  router: fromRouter.RouterReducerState<any>;
  [fromAccounts.featureKey]: fromAccounts.State;
  [fromJournalEntry.journalEntryFeatureKey]: fromJournalEntry.State;
  [fromCustomer.customerFeatureKey]: fromCustomer.State;
  [fromProduct.productFeatureKey]: fromProduct.State;
  [fromInvoice.invoiceFeatureKey]: fromInvoice.State;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  [fromAccounts.featureKey]: fromAccounts.reducer,
  [fromJournalEntry.journalEntryFeatureKey]: fromJournalEntry.reducer,
  [fromCustomer.customerFeatureKey]: fromCustomer.reducer,
  [fromProduct.productFeatureKey]: fromProduct.reducer,
  [fromInvoice.invoiceFeatureKey]: fromInvoice.reducer,
};
