import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { ProductCategoryActions } from './product-category.action';
import { ProductCategory } from './product-category.model';
import { ProductCategoryService } from '../../services/product-category.service';

@Injectable()
export class ProductCategoryEffect {
  constructor(
    private actions$: Actions,
    private productCategoryService: ProductCategoryService,
    private store: Store<AppState>
  ) {}

  loadProductCategories$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductCategoryActions.loadProductCategories),
        tap(() =>
          this.productCategoryService
            .getProductCategories()
            .then((productCategories: ProductCategory[]) => {
              if (productCategories.length) {
                this.store.dispatch(
                  ProductCategoryActions.upsertProductCategories({
                    productCategories,
                  })
                );
              }
              this.store.dispatch(
                ProductCategoryActions.doneLoadingProductCategories()
              );
            })
        )
      ),
    { dispatch: false }
  );
}
