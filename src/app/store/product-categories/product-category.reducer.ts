import { Action, createReducer, on } from '@ngrx/store';
import { ProductCategoryActions } from './product-category.action';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { ProductCategory } from './product-category.model';

export const productCategoryFeatureKey = 'product-category';
export const adapter: EntityAdapter<ProductCategory> = createEntityAdapter();

export interface State extends EntityState<ProductCategory> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const productCategoryReducer = createReducer(
  initialState,
  on(ProductCategoryActions.loadProductCategories, (state) => {
    return { ...state, loading: true };
  }),
  on(ProductCategoryActions.doneLoadingProductCategories, (state) => {
    return { ...state, loading: false };
  }),
  on(ProductCategoryActions.upsertProductCategory, (state, { productCategory }) => {
    return adapter.upsertOne(productCategory, state);
  }),
  on(ProductCategoryActions.upsertProductCategories, (state, { productCategories }) => {
    return adapter.upsertMany(productCategories, state);
  }),
  on(ProductCategoryActions.deleteProductCategory, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(ProductCategoryActions.deleteProductCategories, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(ProductCategoryActions.clearProductCategories, (state) => {
    return adapter.removeAll(state);
  })
);

export const getLoading = (state: State) => state.loading;

export function reducer(state: State, action: Action | undefined) {
  return productCategoryReducer(state, action);
}

export const { selectAll, selectEntities } = adapter.getSelectors();
