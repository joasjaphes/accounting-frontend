import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { CurrencyService } from '../../services/currency.service';
import { PaymentTypeActions } from './payment-type.actions';
import { PaymentType } from './payment-type.model';
import { FinancialPeriodService } from '../../services/financial-period.service';
import { TaxCodeService } from '../../services/tax-code.service';
import { PaymentTypeService } from '../../services/payment-type.service';

@Injectable()
export class PaymentTypeEffect {
  constructor(
    private actions$: Actions,
    private paymentTypeService: PaymentTypeService,
    private store: Store<AppState>
  ) {}

  loadPaymentTypes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PaymentTypeActions.loadPaymentTypes),
        tap(() =>
          this.paymentTypeService
            .getPaymentTypes()
            .then((paymentTypes: PaymentType[]) => {
              if (paymentTypes.length) {
                this.store.dispatch(
                  PaymentTypeActions.upsertPaymentTypes({
                    paymentTypes,
                  })
                );
              }
              this.store.dispatch(PaymentTypeActions.doneLoadingPaymentTypes());
            })
        )
      ),
    { dispatch: false }
  );
}
