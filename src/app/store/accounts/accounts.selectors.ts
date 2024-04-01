import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './accounts.reducer';

export const accountState = createFeatureSelector<fromReducer.State>(
  fromReducer.featureKey
);
export const selectAllAccounts = createSelector(
  accountState,
  fromReducer.selectAll
);
export const selectAccountsLoading = createSelector(
  accountState,
  fromReducer.selectLoading
);
export const selectAccountsLoaded = createSelector(
  accountState,
  fromReducer.selectLoaded
);
export const selectAccountEntities = createSelector(
  accountState,
  fromReducer.selectEntities
);
export const selectAccountById = (id: string) =>
  createSelector(selectAccountEntities, (accounts) => accounts[id]);
