import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { PriceCategoryActions } from './price-category.action';
import { PriceCategory } from './price-category.model';
import { PriceCategoryService } from '../../services/price-category.service';

@Injectable()
export class PriceCategoryEffect {
  constructor(
    private actions$: Actions,
    private priceCategoryService: PriceCategoryService,
    private store: Store<AppState>
  ) {}

  loadPriceCategories$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PriceCategoryActions.loadPriceCategories),
        tap(() =>
          this.priceCategoryService
            .getPriceCategories()
            .then((priceCategories: PriceCategory[]) => {
              if (priceCategories.length) {
                this.store.dispatch(
                  PriceCategoryActions.upsertPriceCategories({
                    priceCategories,
                  })
                );
              }
              this.store.dispatch(
                PriceCategoryActions.doneLoadingPriceCatgories()
              );
            })
        )
      ),
    { dispatch: false }
  );
}
