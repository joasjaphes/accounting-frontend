import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { PaymentType } from './payment-type.model';

export const PaymentTypeActions = createActionGroup({
  source: 'PaymentType',
  events: {
    'Load Payment Types': emptyProps(),
    'Done Loading Payment Types': emptyProps(),
    'Upsert Payment Type': props<{ paymentType: PaymentType }>(),
    'Upsert Payment Types': props<{ paymentTypes: PaymentType[] }>(),
    'Delete Payment Type': props<{ id: string }>(),
    'Delete Payment Types': props<{ ids: string[] }>(),
    'Clear Payment Types': emptyProps(),
  },
});
