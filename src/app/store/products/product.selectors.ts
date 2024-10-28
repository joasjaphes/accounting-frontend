import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './product.reducer';

export const productState = createFeatureSelector<fromReducer.State>(
  fromReducer.productFeatureKey
);
export const selectAll = createSelector(productState, fromReducer.selectAll);
export const selectEntities = createSelector(
  productState,
  fromReducer.selectEntities
);
export const selectLoading = createSelector(
  productState,
  fromReducer.getLoading
);
export const selectById = (id: string) =>
  createSelector(selectAll, (products) =>
    products.find((product) => product.id === id)
  );
export const selectPhysicalProducts = createSelector(selectAll, (products) =>
  products.filter((product) => product.type === 'Physical')
);

export const selectServices = createSelector(selectAll, (products) =>
  products.filter((product) => product.type === 'Service')
);

export const selectDetailed = createSelector(selectAll, (products) => {
  return products;
});

export const selectByIds = (ids: string[]) =>
  createSelector(selectDetailed, (products) =>
    products.filter(
      (product) => ids.includes('ALL') || ids.includes(product.id)
    )
  );
