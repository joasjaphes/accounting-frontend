import { AccountEffect } from './accounts/accounts.effect';
import { CustomerEffect } from './customers/customer.effect';
import { InvoiceEffects } from './invoicing/invoice.effects';
import { JournalEntryEffect } from './journal-entry/journal-entry.effect';
import { ProductEffect } from './products/product.effect';
import { RouterEffects } from './router/router.effects';

export const effects = [
  AccountEffect,
  ProductEffect,
  JournalEntryEffect,
  RouterEffects,
  CustomerEffect,
  InvoiceEffects,
];
