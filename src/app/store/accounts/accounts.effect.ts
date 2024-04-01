import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as accountsActions from '../accounts/accounts.actions';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { AccountService } from '../../services/accounts.service';
import { Account } from './account.model';
import { Store } from '@ngrx/store';
import { AppState } from '..';

@Injectable()
export class AccountEffect {
  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private store: Store<AppState>
  ) {}

  loadAccounts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(accountsActions.loadAccounts),
        tap(() =>
          this.accountService.getAccounts().then((accounts: Account[]) => {
            this.store.dispatch(accountsActions.upsertAccounts({ accounts }));
            this.store.dispatch(accountsActions.doneLoadingAccounts());
          })
        )
      ),
    { dispatch: false }
  );
}
