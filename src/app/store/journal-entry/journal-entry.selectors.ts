import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './journal-entry.reducer';

export const selectJournalState = createFeatureSelector<fromReducer.State>(
  fromReducer.journalEntryFeatureKey
);

export const selectLoading = createSelector(
  selectJournalState,
  fromReducer.getLoading
);

export const selectAll = createSelector(
  selectJournalState,
  fromReducer.selectAll
);
