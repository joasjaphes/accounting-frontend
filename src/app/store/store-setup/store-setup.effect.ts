import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { StoreSetupActions } from './store-setup.actions';
import { StoreSetup } from './store-setup.model';
import { StoreSetupService } from '../../services/store-setup.service';

@Injectable()
export class StoreSetupEffect {
  constructor(
    private actions$: Actions,
    private storeSetupService: StoreSetupService,
    private store: Store<AppState>
  ) {}

  loadStores$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(StoreSetupActions.loadStores),
        tap(() =>
          this.storeSetupService.getStores().then((stores: StoreSetup[]) => {
            if (stores.length) {
              this.store.dispatch(StoreSetupActions.upsertStores({ stores }));
            }
            this.store.dispatch(StoreSetupActions.doneLoadingStores());
          })
        )
      ),
    { dispatch: false }
  );
}
