import { ActionReducerMap } from '@ngrx/store';
import * as fromAccounts from './accounts/accounts.reducer';
import * as fromRouter from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import * as fromJournalEntry from './journal-entry/journal-entry.reducer';
import * as fromCustomer from './customers/customer.reducer';
import * as fromProduct from './products/product.reducer';
import * as fromInvoice from './invoicing/invoice.reducer';
import * as fromStoreSetup from './store-setup/store-setup.reducer';
import * as fromCurrency from './currency/currency.reducer';
import * as fromFinancialPeriod from './financial-period/financial-period.reducer';
import * as fromTaxCode from './tax-code/tax-code.reducer';
import * as fromPaymentType from './payment-type/payment-type.reducer';
import * as fromProductCategory from './product-categories/product-category.reducer';

export interface AppState {
  router: fromRouter.RouterReducerState<any>;
  [fromAccounts.featureKey]: fromAccounts.State;
  [fromJournalEntry.journalEntryFeatureKey]: fromJournalEntry.State;
  [fromCustomer.customerFeatureKey]: fromCustomer.State;
  [fromProduct.productFeatureKey]: fromProduct.State;
  [fromInvoice.invoiceFeatureKey]: fromInvoice.State;
  [fromStoreSetup.storeSetupFeatureKey]: fromStoreSetup.State;
  [fromCurrency.currencyFeatureKey]: fromCurrency.State;
  [fromFinancialPeriod.financialPeriodFeatureKey]: fromFinancialPeriod.State;
  [fromTaxCode.taxCodeFeatureKey]: fromTaxCode.State;
  [fromPaymentType.paymentTypeFeatureKey]: fromPaymentType.State;
  [fromProductCategory.productCategoryFeatureKey]: fromProductCategory.State;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  [fromAccounts.featureKey]: fromAccounts.reducer,
  [fromJournalEntry.journalEntryFeatureKey]: fromJournalEntry.reducer,
  [fromCustomer.customerFeatureKey]: fromCustomer.reducer,
  [fromProduct.productFeatureKey]: fromProduct.reducer,
  [fromInvoice.invoiceFeatureKey]: fromInvoice.reducer,
  [fromStoreSetup.storeSetupFeatureKey]: fromStoreSetup.reducer,
  [fromCurrency.currencyFeatureKey]: fromCurrency.reducer,
  [fromFinancialPeriod.financialPeriodFeatureKey]: fromFinancialPeriod.reducer,
  [fromTaxCode.taxCodeFeatureKey]: fromTaxCode.reducer,
  [fromPaymentType.paymentTypeFeatureKey]: fromPaymentType.reducer,
  [fromProductCategory.productCategoryFeatureKey]: fromProductCategory.reducer,
};
