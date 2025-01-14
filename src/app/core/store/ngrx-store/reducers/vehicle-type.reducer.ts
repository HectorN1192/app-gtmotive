import { VehicleTypeDto } from '@core/models';
import { Action, createReducer, on } from '@ngrx/store';
import {
  clearVehiclesType,
  loadVehiclesType,
  loadVehiclesTypeSuccess,
} from '../actions';

export interface VehicleTypeState {
  id: string | null;
  vehiclesType: VehicleTypeDto[] | null;
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const VehicleTypeInitialState: VehicleTypeState = {
  id: null,
  vehiclesType: null,
  loaded: false,
  loading: false,
  error: null,
};

const _VehicleTypeReducer = createReducer(
  VehicleTypeInitialState,
  on(loadVehiclesType, (state, { id }) => ({
    ...state,
    loading: true,
    id: id,
  })),
  on(loadVehiclesTypeSuccess, (state, { vehiclesType }) => ({
    ...state,
    loading: false,
    loaded: true,
    vehiclesType: [...vehiclesType],
  })),
  on(clearVehiclesType, () => VehicleTypeInitialState)
);

export function VehicleTypeReducer(
  state: VehicleTypeState | undefined,
  action: Action<string>
) {
  return _VehicleTypeReducer(state, action);
}
