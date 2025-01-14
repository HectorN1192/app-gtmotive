import { MakeDto } from '@core/models';
import { createAction, props } from '@ngrx/store';

export const loadMakes = createAction('[Makes] Load Makes');

export const loadMakesSuccess = createAction(
  '[Makes] Load Makes Success',
  props<{ makes: MakeDto[] }>()
);
