import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './product-category.reducer';

export const productCategoryState = createFeatureSelector<fromReducer.State>(
  fromReducer.productCategoryFeatureKey
);
export const selectAll = createSelector(productCategoryState, fromReducer.selectAll);
export const selectEntities = createSelector(
  productCategoryState,
  fromReducer.selectEntities
);
export const selectLoading = createSelector(
  productCategoryState,
  fromReducer.getLoading
);
export const selectById = (id: string) =>
  createSelector(selectAll, (stores) =>
    stores.find((store) => store.id === id)
  );
