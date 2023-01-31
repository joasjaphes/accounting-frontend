import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountCategory } from '../../modules/accounts/accounts-categories';
import * as fromAccountReducer from '../reducers/account.reducer';


export const selectAccountState = createFeatureSelector<fromAccountReducer.State>(fromAccountReducer.accountFeatureKey);

export const selectAll = createSelector(selectAccountState,fromAccountReducer.selectAll);
export const selectEntities = createSelector(selectAccountState,fromAccountReducer.selectEntities);
export const selectLoading = createSelector(selectAccountState,fromAccountReducer.getLoading);
export const selectLoaded = createSelector(selectAccountState, fromAccountReducer.getLoaded);

export const selectAssetAccounts = createSelector(selectAll,(accounts) => accounts.filter(account => account.category === AccountCategory.ASSET));
export const selectLiabilityAccounts = createSelector(selectAll,(accounts) => accounts.filter(account => account.category === AccountCategory.LIABILITY));
export const selectShareHolderAccounts = createSelector(selectAll,(accounts) => accounts.filter(account => account.category === AccountCategory.SHARE_HOLDER_EQUITY));
export const selectExpenseAccounts = createSelector(selectAll,(accounts) => accounts.filter(account => account.category === AccountCategory.EXPENSES));
export const selectIncomeAccounts = createSelector(selectAll,(accounts) => accounts.filter(account => account.category === AccountCategory.INCOME));
