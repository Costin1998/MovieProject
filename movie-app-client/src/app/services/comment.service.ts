import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface CommentsResponse {
  id: string;
  movieId: number;
  userId: string;
  content: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getComments(movieId: number): Observable<any[]> {
    return this.http.get<CommentsResponse[]>(`${this.apiUrl}/comments/${movieId}`);
  }

  addComment(comment: {movieId: any, userId: any, userName: any, content: any }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/comments`, comment);
  }
}
