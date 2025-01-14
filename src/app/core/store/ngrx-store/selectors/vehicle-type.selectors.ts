import { createSelector } from '@ngrx/store';
import { AppState } from '../app.reducers';

export const selectVehicleTypeState = (state: AppState) => state.vehiclesType;

export const selectMappedVehicleTypes = createSelector(
  selectVehicleTypeState,
  (state) =>
    state.vehiclesType?.map((type) => ({
      typeId: type.VehicleTypeId,
      typeName: type.VehicleTypeName,
    })) || []
);
