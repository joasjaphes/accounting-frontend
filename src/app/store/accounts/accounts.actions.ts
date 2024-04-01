import { createAction, props } from '@ngrx/store';
import { Account } from './account.model';

export const loadAccounts = createAction('[Accounts] Load Accounts');
export const doneLoadingAccounts = createAction('[Accounts] Done Loading Accounts');
export const upsertAccount = createAction(
  '[Accounts] Upsert Account',
  props<{ account: Account }>()
);
export const upsertAccounts = createAction(
  '[Accounts] Upsert Accounts',
  props<{ accounts: Account[] }>()
);
export const deleteAccount = createAction(
  '[Accounts] Delete Account',
  props<{ id: string }>()
);
export const deleteAccounts = createAction(
  '[Accounts] Delete Accounts',
  props<{ ids: string[] }>()
);
export const clearAccounts = createAction('[Accounts] Clear Accounts');
