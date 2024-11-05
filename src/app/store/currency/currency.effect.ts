import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyActions } from './currency.actions';
import { Currency } from './currency.model';

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private currencyService: CurrencyService,
    private store: Store<AppState>
  ) {}

  loadCurrencies$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CurrencyActions.loadCurrencies),
        tap(() =>
          this.currencyService
            .getCurrencies()
            .then((currencies: Currency[]) => {
              if (currencies.length) {
                this.store.dispatch(
                  CurrencyActions.upsertCurrencies({ currencies })
                );
              }
              this.store.dispatch(CurrencyActions.doneLoadingCurrencies());
            })
        )
      ),
    { dispatch: false }
  );
}
