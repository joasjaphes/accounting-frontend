import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './tax-code.reducer';

export const taxCodeState = createFeatureSelector<fromReducer.State>(
  fromReducer.taxCodeFeatureKey
);
export const selectAll = createSelector(taxCodeState, fromReducer.selectAll);
export const selectEntities = createSelector(
  taxCodeState,
  fromReducer.selectEntities
);
export const selectLoading = createSelector(
  taxCodeState,
  fromReducer.getLoading
);
export const selectById = (id: string) =>
  createSelector(selectAll, (stores) =>
    stores.find((store) => store.id === id)
  );
