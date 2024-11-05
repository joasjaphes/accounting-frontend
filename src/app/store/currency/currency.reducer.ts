import { Action, createReducer, on } from '@ngrx/store';
import { CurrencyActions } from './currency.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { Currency } from './currency.model';

export const currencyFeatureKey = 'currency';
export const adapter: EntityAdapter<Currency> = createEntityAdapter();

export interface State extends EntityState<Currency> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const currencyReducer = createReducer(
  initialState,
  on(CurrencyActions.loadCurrencies, (state) => {
    return { ...state, loading: true };
  }),
  on(CurrencyActions.doneLoadingCurrencies, (state) => {
    return { ...state, loading: false };
  }),
  on(CurrencyActions.upsertCurrency, (state, { currency }) => {
    return adapter.upsertOne(currency, state);
  }),
  on(CurrencyActions.upsertCurrencies, (state, { currencies }) => {
    return adapter.upsertMany(currencies, state);
  }),
  on(CurrencyActions.deleteCurrency, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(CurrencyActions.deleteCurrencies, (state, { ids }) => {
    return adapter.removeMany(ids, state);
  }),
  on(CurrencyActions.clearCurrencies, (state) => {
    return adapter.removeAll(state);
  })
);

export const getLoading = (state: State) => state.loading;

export function reducer(state: State, action: Action | undefined) {
  return currencyReducer(state, action);
}

export const { selectAll, selectEntities } = adapter.getSelectors();
