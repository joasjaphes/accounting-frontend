import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '..';
import { PackagingActions } from './packaging.action';
import { Packaging } from './packaging.model';
import { PackagingService } from '../../services/packaging.service';

@Injectable()
export class PackagingEffect {
  constructor(
    private actions$: Actions,
    private packagingService: PackagingService,
    private store: Store<AppState>
  ) {}

  loadPackaging$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PackagingActions.loadPackaging),
        tap(() =>
          this.packagingService
            .getPackagings()
            .then((packagings: Packaging[]) => {
              if (packagings.length) {
                this.store.dispatch(
                  PackagingActions.upsertPackagings({
                    packagings,
                  })
                );
              }
              this.store.dispatch(PackagingActions.doneLoadingPackaging());
            })
        )
      ),
    { dispatch: false }
  );
}
