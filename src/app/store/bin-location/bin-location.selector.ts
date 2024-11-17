import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './bin-location.reducer';

export const binLocationState = createFeatureSelector<fromReducer.State>(
  fromReducer.binLocationFeatureKey
);
export const selectAll = createSelector(
  binLocationState,
  fromReducer.selectAll
);
export const selectEntities = createSelector(
  binLocationState,
  fromReducer.selectEntities
);
export const selectLoading = createSelector(
  binLocationState,
  fromReducer.getLoading
);
export const selectById = (id: string) =>
  createSelector(selectAll, (stores) =>
    stores.find((store) => store.id === id)
  );
