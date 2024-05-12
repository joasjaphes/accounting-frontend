import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './customer.reducer';

export const customerState = createFeatureSelector<fromReducer.State>(
  fromReducer.customerFeatureKey
);

export const selectAll = createSelector(customerState, fromReducer.selectAll);
export const selectEntities = createSelector(
  customerState,
  fromReducer.selectEntities
);
export const selectLoading = createSelector(
  customerState,
  fromReducer.getLoading
);

export const selectById = (id: string) =>
  createSelector(selectAll, (customers) => customers.find((c) => c.id === id));
