import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Jogador } from '../models/jogador.model';

@Injectable({
  providedIn: 'root',
})
export class JogadorService {
  private apiUrl = 'http://localhost:8080/api/jogadores';

  constructor(private http: HttpClient) {}

  // GET - Listar todos os jogadores
  listarTodos(): Observable<Jogador[]> {
    return this.http.get<Jogador[]>(this.apiUrl);
  }

  // GET - Buscar jogador por ID
  buscarPorId(id: number): Observable<Jogador> {
    return this.http.get<Jogador>(`${this.apiUrl}/${id}`);
  }

  // POST - Criar novo jogador
  criar(jogador: Jogador): Observable<Jogador> {
    return this.http.post<Jogador>(this.apiUrl, jogador);
  }

  // PUT - Atualizar jogador
  atualizar(id: number, jogador: Jogador): Observable<Jogador> {
    return this.http.put<Jogador>(`${this.apiUrl}/${id}`, jogador);
  }

  // DELETE - Deletar jogador
  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
