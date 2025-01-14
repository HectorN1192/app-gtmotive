import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiService } from '@core/api';
import * as actions from '@core/store/ngrx-store/actions';
import { MakesEffects } from '@core/store/ngrx-store/effects/makes.effects';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { SearchMakeComponent } from './search-make.component';

describe('SearchMakeComponent', () => {
  let component: SearchMakeComponent;
  let fixture: ComponentFixture<SearchMakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchMakeComponent, BrowserAnimationsModule],
      providers: [
        provideMockStore({
          initialState: {
            Results: [{ Make_ID: 1, Make_Name: 'Toyota' }],
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('Make Store', () => {
  let effects: MakesEffects;
  let actions$: Actions;
  let apiService: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MakesEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: ApiService,
          useValue: {
            getAllMakes: jasmine.createSpy().and.returnValue(
              of({
                Results: [{ Make_ID: 1, Make_Name: 'Toyota' }],
              })
            ),
          },
        },
      ],
    });

    effects = TestBed.inject(MakesEffects);
    actions$ = TestBed.inject(Actions);
    apiService = TestBed.inject(ApiService);
  });

  it('should dispatch loadMakesSuccess', () => {
    const mockResponse = {
      Results: [{ Make_ID: 1, Make_Name: 'Toyota' }],
    };
    const mockAction = actions.loadMakes();
    const expectedAction = actions.loadMakesSuccess({
      makes: mockResponse.Results,
    });

    (apiService.getAllMakes as jasmine.Spy).and.returnValue(of(mockResponse));

    actions$ = of(mockAction);

    effects.loadMakes$.subscribe((action) => {
      expect(action).toEqual(expectedAction);
      expect(action.makes).toEqual(mockResponse.Results);
      expect(action.makes[0].Make_ID).toBe(1);
      expect(action.makes[0].Make_Name).toBe('Toyota');
    });
  });
});
