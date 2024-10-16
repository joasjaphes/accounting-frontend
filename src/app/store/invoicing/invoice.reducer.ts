import { Action, createReducer, on } from '@ngrx/store';
import { InvoiceActions } from './invoice.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Invoice } from './invoice.model';

export const invoiceFeatureKey = 'invoice';

const adapter = createEntityAdapter<Invoice>();

export interface State extends EntityState<Invoice> {
  loading: boolean;
  loaded: boolean;
}

export const initialState: State = adapter.getInitialState({
  loading: false,
  loaded: false,
});

export const invoiceReducer = createReducer(
  initialState,
  on(InvoiceActions.loadInvoices, (state) => {
    return { ...state, loading: true, loaded: false };
  }),
  on(InvoiceActions.doneloadingInvoices, (state) => {
    return { ...state, loaded: true, loading: false };
  }),
  on(InvoiceActions.upsertInvoice, (state, { invoice }) => {
    return adapter.upsertOne(invoice, state);
  }),
  on(InvoiceActions.upsertInvoices, (state, { invoices }) => {
    return adapter.upsertMany(invoices, state);
  })
);

export const getLoading = (state: State) => state.loading;
export const getLoaded = (state: State) => state.loaded;

export const { selectAll, selectEntities } = adapter.getSelectors();

export function reducer( state: State,action: Action | undefined) {
  return invoiceReducer(state, action);
}
