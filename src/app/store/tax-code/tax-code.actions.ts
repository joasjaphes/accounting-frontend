import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TaxCode } from './tax-code.model';

export const TaxCodeActions = createActionGroup({
  source: 'TaxCode',
  events: {
    'Load Tax Codes': emptyProps(),
    'Done Loading Tax Codes': emptyProps(),
    'Upsert Tax Code': props<{ taxCode: TaxCode }>(),
    'Upsert Tax Codes': props<{ taxCodes: TaxCode[] }>(),
    'Delete Tax Code': props<{ id: string }>(),
    'Delete Tax Codes': props<{ ids: string[] }>(),
    'Clear Tax Codes': emptyProps(),
  },
});
