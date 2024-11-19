import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './price-category.reducer';

export const priceCategoryState = createFeatureSelector<fromReducer.State>(
  fromReducer.priceCategoryFeatureKey
);
export const selectAll = createSelector(
  priceCategoryState,
  fromReducer.selectAll
);
export const selectEntities = createSelector(
  priceCategoryState,
  fromReducer.selectEntities
);
export const selectLoading = createSelector(
  priceCategoryState,
  fromReducer.getLoading
);
export const selectById = (id: string) =>
  createSelector(selectAll, (stores) =>
    stores.find((store) => store.id === id)
  );
