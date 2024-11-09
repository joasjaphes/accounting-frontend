import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { CurrencyService } from '../../services/currency.service';
import { FinancialPeriodActions } from './financial-period.actions';
import { FinancialPeriod } from './financial-period.model';
import { FinancialPeriodService } from '../../services/financial-period.service';

@Injectable()
export class FinancialPeriodEffect {
  constructor(
    private actions$: Actions,
    private financialPeriodService: FinancialPeriodService,
    private store: Store<AppState>
  ) {}

  loadFinancialPeriods$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(FinancialPeriodActions.loadFinancialPeriods),
        tap(() =>
          this.financialPeriodService
            .getFinancialPeriods()
            .then((financialPeriods: FinancialPeriod[]) => {
              if (financialPeriods.length) {
                this.store.dispatch(
                  FinancialPeriodActions.upsertFinancialPeriods({
                    financialPeriods,
                  })
                );
              }
              this.store.dispatch(
                FinancialPeriodActions.doneLoadingFinancialPeriods()
              );
            })
        )
      ),
    { dispatch: false }
  );
}
