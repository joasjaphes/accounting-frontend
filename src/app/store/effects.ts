import { AccountEffect } from './accounts/accounts.effect';
import { JournalEntryEffect } from './journal-entry/journal-entry.effect';
import { RouterEffects } from './router/router.effects';

export const effects = [AccountEffect, JournalEntryEffect, RouterEffects];
