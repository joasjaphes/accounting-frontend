import { Action, createReducer, on } from '@ngrx/store';
import { StoreSetupActions } from './store-setup.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { StoreSetup } from './store-setup.model';

export const storeSetupFeatureKey = 'storeSetup';
export const adapter: EntityAdapter<StoreSetup> = createEntityAdapter();

export interface State extends EntityState<StoreSetup> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const storeSetupReducer = createReducer(
  initialState,
  on(StoreSetupActions.loadStores, (state) => {
    return { ...state, loading: true };
  }),
  on(StoreSetupActions.doneLoadingStores, (state) => {
    return { ...state, loading: false };
  }),
  on(StoreSetupActions.upsertStore, (state, { store }) => {
    return adapter.upsertOne(store, state);
  }),
  on(StoreSetupActions.upsertStores, (state, { stores }) => {
    return adapter.upsertMany(stores, state);
  }),
  on(StoreSetupActions.deleteStore, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(StoreSetupActions.deleteStores, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(StoreSetupActions.clearStores, (state) => {
    return adapter.removeAll(state);
  })
);

export const getLoading = (state: State) => state.loading;

export function reducer(state: State, action: Action | undefined) {
  return storeSetupReducer(state, action);
}

export const { selectAll, selectEntities } = adapter.getSelectors();
