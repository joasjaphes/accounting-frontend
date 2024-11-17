import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './packaging.reducer';

export const packagingState = createFeatureSelector<fromReducer.State>(
  fromReducer.packagingFeatureKey
);
export const selectAll = createSelector(packagingState, fromReducer.selectAll);
export const selectEntities = createSelector(
  packagingState,
  fromReducer.selectEntities
);
export const selectLoading = createSelector(
  packagingState,
  fromReducer.getLoading
);
export const selectById = (id: string) =>
  createSelector(selectAll, (stores) =>
    stores.find((store) => store.id === id)
  );
