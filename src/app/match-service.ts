import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Ingressos } from './ingressos';

@Injectable({
  providedIn: 'root',
})
export class IngressosService {
  private apiUrl = `${environment.apiBaseUrl}${environment.endpoints.ingressos}`;

  constructor(private http: HttpClient) {}

  getIngressos(): Observable<Ingressos[]> {
    return this.http.get<Ingressos[]>(this.apiUrl);
  }

  getIngressosById(id: number): Observable<Ingressos> {
    return this.http.get<Ingressos>(`${this.apiUrl}/${id}`);
  }

  saveIngressos(ingressos: Ingressos): Observable<Ingressos> {
    return this.http.post<Ingressos>(this.apiUrl, ingressos);
  }

  deleteIngressos(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateIngressos(id: number, ingressos: Ingressos): Observable<Ingressos> {
    return this.http.put<Ingressos>(`${this.apiUrl}/${id}`, ingressos);
  }
}
