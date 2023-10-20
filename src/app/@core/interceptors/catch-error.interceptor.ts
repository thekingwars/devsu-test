import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class CatchErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const status = error.status;

        switch (status) {
          case 206:
            alert(error.error);
            break;
          case 400:
            alert(error.error);
            break;
          case 401:
            alert(error.error);
            break;
          case 404:
            alert(error.error);
            break;
        }

        return throwError(() => error);
      }),
    );
  }
}
