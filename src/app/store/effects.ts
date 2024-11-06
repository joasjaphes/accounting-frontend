import { AccountEffect } from './accounts/accounts.effect';
import { CurrencyEffect } from './currency/currency.effect';
import { CustomerEffect } from './customers/customer.effect';
import { InvoiceEffects } from './invoicing/invoice.effects';
import { JournalEntryEffect } from './journal-entry/journal-entry.effect';
import { ProductEffect } from './products/product.effect';
import { RouterEffects } from './router/router.effects';
import { StoreSetupEffect } from './store-setup/store-setup.effect';

export const effects = [
  AccountEffect,
  ProductEffect,
  JournalEntryEffect,
  RouterEffects,
  CustomerEffect,
  InvoiceEffects,
  CurrencyEffect,
  StoreSetupEffect,
];
