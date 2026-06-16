import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Jogo } from './jogo';

@Injectable({
  providedIn: 'root',
})
export class JogoService {
  private apiUrl = `${environment.apiBaseUrl}${environment.endpoints.jogos}`;

  constructor(private http: HttpClient) {}

  getJogos(): Observable<Jogo[]> {
    return this.http.get<Jogo[]>(this.apiUrl);
  }

  getJogoById(id: number): Observable<Jogo> {
    return this.http.get<Jogo>(`${this.apiUrl}/${id}`);
  }
}
