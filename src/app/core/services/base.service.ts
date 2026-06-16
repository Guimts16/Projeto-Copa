import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export abstract class BaseService<T> {
  constructor(
    protected http: HttpClient,
    protected apiUrl: string,
  ) {}

  /**
   * Get all resources
   */
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl).pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Get resource by ID
   */
  getById(id: number): Observable<T> {
    return this.http
      .get<T>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Create new resource
   */
  create(data: T): Observable<T> {
    return this.http
      .post<T>(this.apiUrl, data)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Update resource
   */
  update(id: number, data: T): Observable<T> {
    return this.http
      .put<T>(`${this.apiUrl}/${id}`, data)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Delete resource
   */
  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error)));
  }

  /**
   * Error handler
   */
  protected handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error connecting to server';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 0) {
        errorMessage = 'Server not responding. Verify Java backend is running.';
      } else if (error.status === 404) {
        errorMessage = 'Resource not found';
      } else if (error.status === 400) {
        errorMessage = error.error?.message || 'Invalid request';
      } else if (error.status === 500) {
        errorMessage = 'Internal server error';
      } else {
        errorMessage = `Error ${error.status}: ${error.statusText}`;
      }
    }

    console.error('HTTP Error:', errorMessage, error);
    return throwError(() => new Error(errorMessage));
  }
}
