import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideRouter,
  withComponentInputBinding,
  withHashLocation,
} from '@angular/router';
import { AppReducers } from '@core/store/ngrx-store/app.reducers';
import { EffectsArray } from '@core/store/ngrx-store/effects';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HttpErrorInterceptor, SpinnerInterceptor } from '@shared/interceptors';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([SpinnerInterceptor, HttpErrorInterceptor])
    ),
    provideRouter(routes, withComponentInputBinding(), withHashLocation()),
    provideAnimationsAsync(),
    provideStore(AppReducers),
    provideEffects(EffectsArray),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
};
