import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './payment-type.reducer';

export const paymentTypeState = createFeatureSelector<fromReducer.State>(
  fromReducer.paymentTypeFeatureKey
);
export const selectAll = createSelector(paymentTypeState, fromReducer.selectAll);
export const selectEntities = createSelector(
  paymentTypeState,
  fromReducer.selectEntities
);
export const selectLoading = createSelector(
  paymentTypeState,
  fromReducer.getLoading
);
export const selectById = (id: string) =>
  createSelector(selectAll, (stores) =>
    stores.find((store) => store.id === id)
  );
