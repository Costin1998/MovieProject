import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly apiUrl = environment.tmdbApiUrl;
  private readonly apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}

  getLatestMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1`);
  }

  getTopRatedMovies() {
    return this.http.get(`${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}`);
  }

  getMoviesByGenre(genreId: number): Observable<any> {
    const url = `${this.apiUrl}/discover/movie?with_genres=${genreId}&api_key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

  searchMovies(query: string): Observable<any> {
    const url = `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${encodeURIComponent(query)}`;
    return this.http.get<any>(url);
  }

  getMovieDetails(id: string) {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`);
  }

  getMovieCredits(id: string) {
    return this.http.get(`${this.apiUrl}/movie/${id}/credits?api_key=${this.apiKey}&language=en-US`);
  }

  getMovieImages(id: string) {
    return this.http.get(`${this.apiUrl}/movie/${id}/images?api_key=${this.apiKey}`);
  }
}
