import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { NotifierService } from './notifier.service';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  myURL = 'http://localhost:3000/products';

  constructor(
    public http: HttpClient,
    public notifierService: NotifierService
  ) {}

  getUrl() {
    return this.http.get(this.myURL);
    // .pipe(retry(3), catchError(this.handleError));
  }

  postUrl(data: any) {
    return this.http.post(this.myURL, data);
    // .pipe(retry(3), catchError(this.handleError));
  }

  putUrl(id: any, data: any) {
    return this.http.put(this.myURL + id, data);
    // .pipe(retry(3), catchError(this.handleError));
  }

  deleteUrl(id: any) {
    return this.http.delete(this.myURL + id);
    // .pipe(retry(3), catchError(this.handleError));
  }

  // Gestione Errori su Componente
  // private handleError(error: HttpErrorResponse) {
  //   let myErrorMessage = '';

  //   if (error.status === 0) {
  //     myErrorMessage =
  //       error.status + ' ' + 'Qualcosa è andato storto!' + ' ' + error.message;
  //   }

  //   if (error.status === 404) {
  //     myErrorMessage =
  //       error.status + ' ' + 'Richiesta non trovata!' + ' ' + error.message;
  //   }
  //   if (error.status === 401) {
  //     myErrorMessage =
  //       error.status + ' ' + 'Non Autorizzato!' + ' ' + error.message;
  //   }

  //   if (error.status === 501) {
  //     myErrorMessage =
  //       error.status +
  //       ' ' +
  //       'Richiesta non supportata dal server!' +
  //       ' ' +
  //       error.message;
  //   }
  //   return throwError(() => new Error(myErrorMessage));
  // }
}
