import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { CustomerActions } from './customer.actions';
import { Customer } from './customer.model';
import { CustomerService } from '../../services/customer.service';

@Injectable()
export class CustomerEffect {
  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private store: Store<AppState>
  ) {}

  loadCustomers$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CustomerActions.loadCustomers),
        tap(() =>
          this.customerService.getCustomers().then((customers: Customer[]) => {
            this.store.dispatch(CustomerActions.upsertCustomers({ customers }));
            this.store.dispatch(CustomerActions.doneLoadingCustomers());
          })
        )
      ),
    { dispatch: false }
  );
}
