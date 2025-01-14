import { MakeDto } from '@core/models';
import { Action, createReducer, on } from '@ngrx/store';
import { loadMakes, loadMakesSuccess } from '../actions';

export interface MakesState {
  makes: MakeDto[];
  loaded: boolean;
  loading: boolean;
  error: any;
}

export const makesInitialState: MakesState = {
  makes: [],
  loaded: false,
  loading: false,
  error: null,
};

const _makesReducer = createReducer(
  makesInitialState,
  on(loadMakes, (state) => ({ ...state, loading: true })),
  on(loadMakesSuccess, (state, { makes }) => ({
    ...state,
    loading: false,
    loaded: true,
    makes: [...makes],
  }))
);

export function makesReducer(
  state: MakesState | undefined,
  action: Action<string>
) {
  return _makesReducer(state, action);
}
