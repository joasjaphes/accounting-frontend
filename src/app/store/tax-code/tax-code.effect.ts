import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { CurrencyService } from '../../services/currency.service';
import { TaxCodeActions } from './tax-code.actions';
import { TaxCode } from './tax-code.model';
import { FinancialPeriodService } from '../../services/financial-period.service';
import { TaxCodeService } from '../../services/tax-code.service';

@Injectable()
export class TaxCodeEffect {
  constructor(
    private actions$: Actions,
    private taxCodeService: TaxCodeService,
    private store: Store<AppState>
  ) {}

  loadTaxCodes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TaxCodeActions.loadTaxCodes),
        tap(() =>
          this.taxCodeService.getTaxCodes().then((taxCodes: TaxCode[]) => {
            if (taxCodes.length) {
              this.store.dispatch(
                TaxCodeActions.upsertTaxCodes({
                  taxCodes,
                })
              );
            }
            this.store.dispatch(TaxCodeActions.doneLoadingTaxCodes());
          })
        )
      ),
    { dispatch: false }
  );
}
