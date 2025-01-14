import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import * as makesActions from '../actions/makes.actions';

@Injectable()
export class MakesEffects {
  private readonly _apiService = inject(ApiService);
  private readonly _actions$ = inject(Actions);

  loadMakes$ = createEffect(() =>
    this._actions$.pipe(
      ofType(makesActions.loadMakes),
      mergeMap(() =>
        this._apiService
          .getAllMakes()
          .pipe(
            map((makes) =>
              makesActions.loadMakesSuccess({ makes: makes.Results })
            )
          )
      )
    )
  );
}
