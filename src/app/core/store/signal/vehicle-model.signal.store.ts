import { computed, inject } from '@angular/core';
import { ApiService } from '@core/api';
import { VehicleModelDto } from '@core/models';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { finalize, pipe, switchMap, tap } from 'rxjs';

export interface ModelSignalState {
  vehiclesModel: VehicleModelDto[];
  isLoading: boolean;
}

const initialState: ModelSignalState = {
  vehiclesModel: [],
  isLoading: false,
};

export const ModelSignalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    modelsTable: computed(() =>
      store.vehiclesModel().map((model) => ({
        modelId: model.Model_ID,
        modelName: model.Model_Name,
      }))
    ),
  })),
  withMethods((store, apiService = inject(ApiService)) => ({
    loadModels: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return apiService.getModelsForMakeId(id).pipe(
            tap((response) => {
              patchState(store, {
                vehiclesModel: response.Results,
                isLoading: false,
              });
            }),

            finalize(() => patchState(store, { isLoading: false }))
          );
        })
      )
    ),
    clearModels: () => patchState(store, { ...initialState }),
  }))
);
