import { VehicleTypeDto } from '@core/models';
import { createAction, props } from '@ngrx/store';

export const loadVehiclesType = createAction(
  '[VehicleType] Load VehicleType',
  props<{ id: string }>()
);

export const loadVehiclesTypeSuccess = createAction(
  '[VehicleType] Load VehicleType Success',
  props<{ vehiclesType: VehicleTypeDto[] }>()
);

export const clearVehiclesType = createAction(
  '[VehicleType] Clear VehicleType'
);
