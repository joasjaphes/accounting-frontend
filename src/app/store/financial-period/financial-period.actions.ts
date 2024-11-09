import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FinancialPeriod } from './financial-period.model';

export const FinancialPeriodActions = createActionGroup({
  source: 'FinancialPeriod',
  events: {
    'Load Financial Periods': emptyProps(),
    'Done Loading Financial Periods': emptyProps(),
    'Upsert Financial Period': props<{ financialPeriod: FinancialPeriod }>(),
    'Upsert Financial Periods': props<{ financialPeriods: FinancialPeriod[] }>(),
    'Delete Financial Period': props<{ id: string }>(),
    'Delete Financial Periods': props<{ ids: string[] }>(),
    'Clear Financial Periods': emptyProps(),
  },
});
