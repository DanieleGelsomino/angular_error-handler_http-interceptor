import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, retry } from 'rxjs';
import { NotifierService } from './notifier.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private notifierService: NotifierService,
    private router: Router
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('richiesta in arrivo');
    req = req.clone({
      headers: req.headers.set('Authorization', 'my-Token'),
      responseType: 'json',
    });
    return next.handle(req).pipe(
      retry(3), // esegue di nuovo la sottoscrizione tot volte prima di chiamare l'errore
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.setError(error);

        this.notifierService.showNotification(`${errorMessage}`, 'ok', 'error');

        return throwError(errorMessage);
      })
    );
  }

  // Gestione Errori Globale
  setError(error: HttpErrorResponse): string {
    let errorMessage =
      error.status + ' ' + 'Errore sconosciuto' + ' ' + error.message;
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      if (error.status === 400) {
        errorMessage =
          error.status + ' ' + 'Risorsa non valida!' + ' ' + error.message;
      }
      if (error.status === 401) {
        errorMessage =
          error.status + ' ' + 'Non autorizzato!' + ' ' + error.message;
        this.router.navigate(['/']);
      }
      if (error.status === 404) {
        errorMessage =
          error.status + ' ' + 'Risorsa non trovata!' + ' ' + error.message;
      }
      if (error.status === 501) {
        errorMessage =
          error.status +
          ' ' +
          'Richiesta non supportata dal server!' +
          ' ' +
          error.message;
      }
    }
    return errorMessage;
  }
}
