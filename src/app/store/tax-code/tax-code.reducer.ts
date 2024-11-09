import { Action, createReducer, on } from '@ngrx/store';
import { TaxCodeActions } from './tax-code.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { TaxCode } from './tax-code.model';

export const taxCodeFeatureKey = 'tax-code';
export const adapter: EntityAdapter<TaxCode> = createEntityAdapter();

export interface State extends EntityState<TaxCode> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const taxCodeReducer = createReducer(
  initialState,
  on(TaxCodeActions.loadTaxCodes, (state) => {
    return { ...state, loading: true };
  }),
  on(TaxCodeActions.doneLoadingTaxCodes, (state) => {
    return { ...state, loading: false };
  }),
  on(TaxCodeActions.upsertTaxCode, (state, { taxCode }) => {
    return adapter.upsertOne(taxCode, state);
  }),
  on(TaxCodeActions.upsertTaxCodes, (state, { taxCodes }) => {
    return adapter.upsertMany(taxCodes, state);
  }),
  on(TaxCodeActions.deleteTaxCode, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(TaxCodeActions.deleteTaxCodes, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(TaxCodeActions.clearTaxCodes, (state) => {
    return adapter.removeAll(state);
  })
);

export const getLoading = (state: State) => state.loading;

export function reducer(state: State, action: Action | undefined) {
  return taxCodeReducer(state, action);
}

export const { selectAll, selectEntities } = adapter.getSelectors();
