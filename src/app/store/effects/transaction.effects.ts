import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';
import * as transactionActions from '../actions/transaction.actions';
import { Transaction } from '../models/transaction.model';



@Injectable()
export class TransactionEffects {



  constructor(private actions$: Actions, private transactionService: TransactionService) { }

  loadTransactions$ = createEffect(() => this.actions$.pipe(
    ofType(transactionActions.loadTransactions),
    mergeMap(() => this.transactionService.getAllTransactions().pipe(
      map(transactions => transactionActions.upsertTransactions({ transactions }))
    )),
  ));

}
