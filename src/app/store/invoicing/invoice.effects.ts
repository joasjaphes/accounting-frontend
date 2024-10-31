import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {InvoiceActions} from './invoice.actions';
import { tap } from 'rxjs';
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from './invoice.model';
import { Store } from '@ngrx/store';
import { AppState } from '..';



@Injectable()
export class InvoiceEffects {


  constructor(private actions$: Actions, private invoiceService:InvoiceService, private store:Store<AppState>) {}

  loadInvoices$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(InvoiceActions.loadInvoices),
        tap(() =>
          this.invoiceService.getInvoices().then((invoices: Invoice[]) => {
            this.store.dispatch(InvoiceActions.upsertInvoices({ invoices }));
            this.store.dispatch(InvoiceActions.doneloadingInvoices());
          })
        )
      ),
    { dispatch: false }
  );
}
