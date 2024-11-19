import { Action, createReducer, on } from '@ngrx/store';
import { PriceCategoryActions } from './price-category.action';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { PriceCategory } from './price-category.model';

export const priceCategoryFeatureKey = 'priceCategory';
export const adapter: EntityAdapter<PriceCategory> = createEntityAdapter();

export interface State extends EntityState<PriceCategory> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const priceCategoryReducer = createReducer(
  initialState,
  on(PriceCategoryActions.loadPriceCategories, (state) => {
    return { ...state, loading: true };
  }),
  on(PriceCategoryActions.doneLoadingPriceCatgories, (state) => {
    return { ...state, loading: false };
  }),
  on(PriceCategoryActions.upsertPriceCategory, (state, { priceCategory }) => {
    return adapter.upsertOne(priceCategory, state);
  }),
  on(
    PriceCategoryActions.upsertPriceCategories,
    (state, { priceCategories }) => {
      return adapter.upsertMany(priceCategories, state);
    }
  ),
  on(PriceCategoryActions.deletePriceCategory, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(PriceCategoryActions.deletePriceCategories, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(PriceCategoryActions.clearPriceCategories, (state) => {
    return adapter.removeAll(state);
  })
);

export const getLoading = (state: State) => state.loading;

export function reducer(state: State, action: Action | undefined) {
  return priceCategoryReducer(state, action);
}

export const { selectAll, selectEntities } = adapter.getSelectors();
