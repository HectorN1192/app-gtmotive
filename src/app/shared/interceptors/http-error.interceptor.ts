import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error) => {
      /**
       * Aqui podriamos añadir casos por código de error para personalizar
       * los diferentes errores que se puedan dar en las llamadas http.
       */
      return throwError(
        () =>
          `Error status: ${error.status},\n, mesnsaje: ${error.error.message},\n, detalle: ${error.error.messageDetail}`
      );
    })
  );
};
