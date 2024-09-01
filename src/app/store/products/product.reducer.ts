import { Action, createReducer, on } from '@ngrx/store';
import { ProductActions } from './product.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Product } from './product.model';

export const productFeatureKey = 'product';
export const adapter: EntityAdapter<Product> = createEntityAdapter();

export interface State extends EntityState<Product> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProducts, (state) => {
    return { ...state, loading: true };
  }),
  on(ProductActions.doneLoadingProducts, (state) => {
    return { ...state, loading: false };
  }),
  on(ProductActions.upsertProduct, (state, { product }) => {
    console.log('product', product);
    return adapter.upsertOne(product, state);
  }),
  on(ProductActions.upsertProducts, (state, { products }) => {
    return adapter.upsertMany(products, state);
  }),
  on(ProductActions.deleteProduct, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(ProductActions.deleteProducts, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(ProductActions.clearProducts, (state) => {
    return adapter.removeAll(state);
  })
);

export const getLoading = (state: State) => state.loading;

export function reducer(state: State, action: Action | undefined) {
  return productReducer(state, action);
}

export const { selectAll, selectEntities } = adapter.getSelectors();
