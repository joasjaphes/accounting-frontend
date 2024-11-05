import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Currency } from './currency.model';

export const CurrencyActions = createActionGroup({
  source: 'Currency',
  events: {
    'Load Currencies': emptyProps(),
    'Done Loading Currencies': emptyProps(),
    'Upsert Currency': props<{ currency: Currency }>(),
    'Upsert Currencies': props<{ currencies: Currency[] }>(),
    'Delete Currency': props<{ id: string }>(),
    'Delete Currencies': props<{ ids: string[] }>(),
    'Clear Currencies': emptyProps(),
  },
});
