import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducer from './invoice.reducer';
import moment from 'moment';

export const invoiceState = createFeatureSelector<fromReducer.State>(
  fromReducer.invoiceFeatureKey
);

export const selectEntities = createSelector(
  invoiceState,
  fromReducer.selectEntities
);
export const selectAll = createSelector(invoiceState, fromReducer.selectAll);

export const selectDetailed = createSelector(selectAll, (invoices) => {
  return invoices.map((invoice) => {
    return {
      ...invoice,
      date: moment(invoice.date).format('YYYY-MM-DD'),
      customerName: invoice?.customer?.name,
      itemList: invoice.items.map((item) => item?.product?.name).join(','),
    };
  });
});
