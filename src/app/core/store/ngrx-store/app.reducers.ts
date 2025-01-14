import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';

export interface AppState {
  makes: reducers.MakesState;
  vehiclesType: reducers.VehicleTypeState;
}

export const AppReducers: ActionReducerMap<AppState> = {
  makes: reducers.makesReducer,
  vehiclesType: reducers.VehicleTypeReducer,
};
