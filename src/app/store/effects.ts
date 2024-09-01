import { AccountEffect } from './accounts/accounts.effect';
import { JournalEntryEffect } from './journal-entry/journal-entry.effect';
import { ProductEffect } from './products/product.effect';
import { RouterEffects } from './router/router.effects';

export const effects = [
  AccountEffect,
  ProductEffect,
  JournalEntryEffect,
  RouterEffects,
];
