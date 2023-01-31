import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs';
import { AccountService } from '../../services/account.service';
import * as accountActions from '../actions/account.actions';



@Injectable()
export class AccountEffects {



  constructor(private actions$: Actions, private accountService: AccountService) { }

  loadAccounts$ = createEffect(() => this.actions$.pipe(
    ofType(accountActions.loadAccounts),
    mergeMap(() => this.accountService.getAllAccounts()
      .pipe(map(accounts => accountActions.upsertAccounts({ accounts })))
    )));

}
