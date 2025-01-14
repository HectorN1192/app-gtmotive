import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ApiService } from '@core/api';
import * as vehicleActions from '@core/store/ngrx-store/actions';
import { VehicleTypeEffects } from '@core/store/ngrx-store/effects/vehicle-type.effects';
import {
  VehicleTypeInitialState,
  VehicleTypeReducer,
  VehicleTypeState,
} from '@core/store/ngrx-store/reducers';
import { ModelSignalStore } from '@core/store/signal';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { delay, of } from 'rxjs';

describe('Vehicle Type Store', () => {
  let effects: VehicleTypeEffects;
  let actions$: Actions;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VehicleTypeEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: ApiService,
          useValue: {
            getVehicleTypesForMakeId: jasmine.createSpy().and.returnValue(
              of({
                Results: [{ VehicleTypeId: 1, VehicleTypeName: 'Toyota' }],
              })
            ),
          },
        },
        provideMockStore({
          initialState: {
            vehicleType: VehicleTypeInitialState,
          },
        }),
      ],
    });

    effects = TestBed.inject(VehicleTypeEffects);
    actions$ = TestBed.inject(Actions);
    apiService = TestBed.inject(ApiService);
  });

  it('should dispatch loadVehiclesTypeSuccess', () => {
    const mockResponse = {
      Results: [{ VehicleTypeId: 1, VehicleTypeName: 'Toyota' }],
    };
    const mockAction = vehicleActions.loadVehiclesType({ id: '1' });
    const expectedAction = vehicleActions.loadVehiclesTypeSuccess({
      vehiclesType: mockResponse.Results,
    });

    (apiService.getVehicleTypesForMakeId as jasmine.Spy).and.returnValue(
      of(mockResponse)
    );

    actions$ = of(mockAction);

    effects.loadVehicleTypeDto$.subscribe((action) => {
      expect(action).toEqual(expectedAction);
      expect(apiService.getVehicleTypesForMakeId).toHaveBeenCalledWith('1');
      expect(action.vehiclesType).toEqual(mockResponse.Results);
      expect(action.vehiclesType[0].VehicleTypeId).toBe(1);
      expect(action.vehiclesType[0].VehicleTypeName).toBe('Toyota');
    });
  });

  it('should dispatch clearVehiclesType', () => {
    const initialState: VehicleTypeState = {
      ...VehicleTypeInitialState,
      vehiclesType: [{ VehicleTypeId: 1, VehicleTypeName: 'Toyota' }],
      loaded: true,
      loading: false,
      error: null,
    };

    const action = vehicleActions.clearVehiclesType();

    const newState = VehicleTypeReducer(initialState, action);

    expect(newState).toEqual(VehicleTypeInitialState);
    expect(newState.vehiclesType).toBeNull();
    expect(newState.loaded).toBeFalse();
    expect(newState.loading).toBeFalse();
    expect(newState.error).toBeNull();
  });
});

describe('Vehicles Model Signal Store', () => {
  const setup = () => {
    const apiService = {
      getModelsForMakeId: () =>
        of({
          Results: [
            {
              Make_ID: 1,
              Make_Name: 'toyota',
              Model_ID: 2,
              Model_Name: 'yaris',
            },
          ],
        }).pipe(delay(100)),
    };

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiService,
          useValue: apiService,
        },
      ],
    });

    return TestBed.inject(ModelSignalStore);
  };

  it('should load models', fakeAsync(() => {
    const store = setup();

    store.loadModels('1');

    tick(50);
    expect(store.isLoading()).toBe(true);
    expect(store.vehiclesModel()).toEqual([]);

    tick(50);
    expect(store.isLoading()).toBe(false);
    expect(store.vehiclesModel()).toEqual([
      {
        Make_ID: 1,
        Make_Name: 'toyota',
        Model_ID: 2,
        Model_Name: 'yaris',
      },
    ]);
  }));

  it('should clean signal store', fakeAsync(() => {
    const store = setup();

    store.clearModels();

    expect(store.isLoading()).toBe(false);
    expect(store.vehiclesModel()).toEqual([]);
  }));
});
