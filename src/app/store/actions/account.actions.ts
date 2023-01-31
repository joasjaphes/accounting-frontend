import { createAction, props } from '@ngrx/store';
import { Account } from '../models/account.model';

export const loadAccounts = createAction('[Home component] Loads all accounts');
export const upsertAccounts = createAction('[Account effect] update accounts', props<{accounts:Account[]}>());
export const upsertAccount = createAction('[Add edit account component] update account', props<{account:Account}>());
export const doneLoading = createAction('[Account effect] done loading account');
