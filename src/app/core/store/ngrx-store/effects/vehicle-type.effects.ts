import { inject, Injectable } from '@angular/core';
import { ApiService } from '@core/api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import * as vehicleActions from '../actions/vehicle-type.actions';

@Injectable()
export class VehicleTypeEffects {
  private readonly _actions$ = inject(Actions);
  private readonly _apiService = inject(ApiService);

  loadVehicleTypeDto$ = createEffect(() =>
    this._actions$.pipe(
      ofType(vehicleActions.loadVehiclesType),
      mergeMap((action) =>
        this._apiService.getVehicleTypesForMakeId(action.id).pipe(
          map((vechicleType) =>
            vehicleActions.loadVehiclesTypeSuccess({
              vehiclesType: vechicleType.Results,
            })
          )
        )
      )
    )
  );
}
