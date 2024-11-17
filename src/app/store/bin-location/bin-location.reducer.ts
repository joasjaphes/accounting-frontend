import { Action, createReducer, on } from '@ngrx/store';
import { BinLocationActions } from './bin-location.action';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { BinLocation } from './bin-location.model';

export const binLocationFeatureKey = 'binLocation';
export const adapter: EntityAdapter<BinLocation> = createEntityAdapter();

export interface State extends EntityState<BinLocation> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const binLocationReducer = createReducer(
  initialState,
  on(BinLocationActions.loadBinLocations, (state) => {
    return { ...state, loading: true };
  }),
  on(BinLocationActions.doneLoadingBinLocations, (state) => {
    return { ...state, loading: false };
  }),
  on(BinLocationActions.upsertBinLocation, (state, { binLocation }) => {
    return adapter.upsertOne(binLocation, state);
  }),
  on(BinLocationActions.upsertBinLocations, (state, { binLocations }) => {
    return adapter.upsertMany(binLocations, state);
  }),
  on(BinLocationActions.deleteBinLocation, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(BinLocationActions.deleteBinLocations, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(BinLocationActions.clearBinLocations, (state) => {
    return adapter.removeAll(state);
  })
);

export const getLoading = (state: State) => state.loading;

export function reducer(state: State, action: Action | undefined) {
  return binLocationReducer(state, action);
}

export const { selectAll, selectEntities } = adapter.getSelectors();
