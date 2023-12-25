import { AccountEffects } from './account.effects';
import { RegistrationEffects } from './registration.effects';
import { RouterEffects } from './router.effects';
import { TransactionEffects } from './transaction.effects';

export const effects = [
  RouterEffects,
  TransactionEffects,
  AccountEffects,
  RegistrationEffects,
];
