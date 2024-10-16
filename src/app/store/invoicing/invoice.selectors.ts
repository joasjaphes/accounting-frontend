import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './invoice.reducer';

export const invoiceState = createFeatureSelector<fromReducer.State>(
  fromReducer.invoiceFeatureKey
);

export const selectEntities = createSelector(
  invoiceState,
  fromReducer.selectEntities
);
export const selectAll = createSelector(invoiceState, fromReducer.selectAll);
