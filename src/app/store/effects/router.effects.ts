import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { first, map, shareReplay, tap } from 'rxjs';
import * as routerAction from '../actions/router.actions';



@Injectable()
export class RouterEffects {



  constructor(private actions$: Actions, private router: Router) { }


  navigate$ = createEffect(() => this.actions$.pipe(
    ofType(routerAction.go),
    map((action) => action),
    tap((actionPayload) => this.router.navigate(actionPayload.route.path))
  ), { dispatch: false }
  );
}
