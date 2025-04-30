import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private readonly apiUrl = environment.tmdbApiUrl;
  private readonly apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}

  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}&language=en-US`);
  }

  getGenreById(genreId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/genre/${genreId}?api_key=${this.apiKey}`);
  }
}
