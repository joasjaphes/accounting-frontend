import { ActionReducerMap } from '@ngrx/store';
import * as fromAccounts from './accounts/accounts.reducer';
import * as fromRouter from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import * as fromJournalEntry from './journal-entry/journal-entry.reducer';

export interface AppState {
  router: fromRouter.RouterReducerState<any>;
  [fromAccounts.featureKey]: fromAccounts.State;
  [fromJournalEntry.journalEntryFeatureKey]: fromJournalEntry.State;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  [fromAccounts.featureKey]: fromAccounts.reducer,
  [fromJournalEntry.journalEntryFeatureKey]: fromJournalEntry.reducer,
};
