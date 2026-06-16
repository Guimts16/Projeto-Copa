import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from './match';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  apiUrl = 'http://localhost:8080/matches';

  constructor(private http: HttpClient) {}

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.apiUrl);
  }

  saveMatch(match: Match): Observable<Match> {
    return this.http.post<Match>(this.apiUrl, match);
  }

  deleteMatch(match: Match): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${match.id}`);
  }
}
