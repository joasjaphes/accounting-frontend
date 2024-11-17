import { AccountEffect } from './accounts/accounts.effect';
import { CurrencyEffect } from './currency/currency.effect';
import { CustomerEffect } from './customers/customer.effect';
import { FinancialPeriodEffect } from './financial-period/financial-period.effect';
import { InvoiceEffects } from './invoicing/invoice.effects';
import { JournalEntryEffect } from './journal-entry/journal-entry.effect';
import { PaymentTypeEffect } from './payment-type/payment-type.effect';
import { ProductEffect } from './products/product.effect';
import { RouterEffects } from './router/router.effects';
import { StoreSetupEffect } from './store-setup/store-setup.effect';
import { TaxCodeEffect } from './tax-code/tax-code.effect';
import { ProductCategoryEffect } from './product-categories/product-category.effect';

export const effects = [
  AccountEffect,
  ProductEffect,
  JournalEntryEffect,
  RouterEffects,
  CustomerEffect,
  InvoiceEffects,
  CurrencyEffect,
  StoreSetupEffect,
  FinancialPeriodEffect,
  TaxCodeEffect,
  PaymentTypeEffect,
  ProductCategoryEffect,
];
