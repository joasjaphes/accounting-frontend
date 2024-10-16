import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Invoice } from './invoice.model';

export const InvoiceActions = createActionGroup({
  source: 'Invoice',
  events: {
    'Load Invoices': emptyProps(),
    'Doneloading Invoices': emptyProps(),
    'Upsert Invoice': props<{ invoice: Invoice }>(),
    'Upsert Invoices': props<{ invoices: Invoice[] }>(),
  },
});
