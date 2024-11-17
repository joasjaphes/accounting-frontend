import { Action, createReducer, on } from '@ngrx/store';
import { PackagingActions } from './packaging.action';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Packaging } from './packaging.model';

export const packagingFeatureKey = 'packaging';
export const adapter: EntityAdapter<Packaging> = createEntityAdapter();

export interface State extends EntityState<Packaging> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const packagingReducer = createReducer(
  initialState,
  on(PackagingActions.loadPackaging, (state) => {
    return { ...state, loading: true };
  }),
  on(PackagingActions.doneLoadingPackaging, (state) => {
    return { ...state, loading: false };
  }),
  on(PackagingActions.upsertPackaging, (state, { packaging }) => {
    return adapter.upsertOne(packaging, state);
  }),
  on(PackagingActions.upsertPackagings, (state, { packagings }) => {
    return adapter.upsertMany(packagings, state);
  }),
  on(PackagingActions.deletePackaging, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(PackagingActions.deletePackagings, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(PackagingActions.clearPackagings, (state) => {
    return adapter.removeAll(state);
  })
);

export const getLoading = (state: State) => state.loading;

export function reducer(state: State, action: Action | undefined) {
  return packagingReducer(state, action);
}

export const { selectAll, selectEntities } = adapter.getSelectors();
