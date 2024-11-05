import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './currency.reducer';

export const currencyState = createFeatureSelector<fromReducer.State>(
  fromReducer.currencyFeatureKey
);
export const selectAll = createSelector(currencyState, fromReducer.selectAll);
export const selectEntities = createSelector(
  currencyState,
  fromReducer.selectEntities
);
export const selectLoading = createSelector(
  currencyState,
  fromReducer.getLoading
);
export const selectById = (id: string) =>
  createSelector(selectAll, (stores) =>
    stores.find((store) => store.id === id)
  );
