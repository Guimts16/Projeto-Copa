import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from './../../../environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // headers padrão
    const modifiedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return next.handle(modifiedRequest).pipe(
      timeout(environment.apiTimeout),
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error);
      }),
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erro ao conectar com o servidor';

    if (error.error instanceof ErrorEvent) {
      // Erro de cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro de servidor
      if (error.status === 0) {
        errorMessage =
          'Não foi possível conectar ao servidor. Verifique se o backend Java está rodando.';
      } else if (error.status === 404) {
        errorMessage = 'Recurso não encontrado (404)';
      } else if (error.status === 400) {
        errorMessage = error.error?.message || 'Requisição inválida (400)';
      } else if (error.status === 500) {
        errorMessage = 'Erro interno do servidor (500)';
      } else {
        errorMessage = `Erro ${error.status}: ${error.statusText}`;
      }
    }

    console.error('Erro HTTP:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
