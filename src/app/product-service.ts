import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Jogador } from './jogador';

@Injectable({
  providedIn: 'root',
})
export class JogadorService {
  private apiUrl = `${environment.apiBaseUrl}${environment.endpoints.jogadores}`;

  constructor(private http: HttpClient) {}

  getAllJogadores(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(this.apiUrl);
  }

  getJogadorById(id: number): Observable<Jogador> {
    return this.http.get<Jogador>(`${this.apiUrl}/${id}`);
  }

  saveJogador(jogador: Jogador): Observable<Jogador> {
    return this.http.post<Jogador>(this.apiUrl, jogador);
  }

  deleteJogador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateJogador(id: number, jogador: Jogador): Observable<Jogador> {
    return this.http.put<Jogador>(`${this.apiUrl}/${id}`, jogador);
  }
}
