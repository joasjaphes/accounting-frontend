import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Customer } from './customer.model';

export const CustomerActions = createActionGroup({
  source: 'Customer',
  events: {
    'Load Customers': emptyProps(),
    'Done Loading Customers': emptyProps(),
    'Upsert Customer': props<{ customer: Customer }>(),
    'Upsert Customers': props<{ customers: Customer[] }>(),
    'Delete Customer': props<{ id: string }>(),
    'Delete Customers': props<{ ids: string[] }>(),
    'Clear Customers': emptyProps(),
  },
});
