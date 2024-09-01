import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { ProductService } from '../../services/product.service';
import { ProductActions } from './product.actions';
import { Product } from './product.model';

@Injectable()
export class ProductEffect {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store<AppState>
  ) {}

  loadProducts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductActions.loadProducts),
        tap(() =>
          this.productService.getProducts().then((products: Product[]) => {
            console.log('Products', products);
            this.store.dispatch(ProductActions.upsertProducts({ products }));
            this.store.dispatch(ProductActions.doneLoadingProducts());
          })
        )
      ),
    { dispatch: false }
  );
}
