import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:44321/api';
  private jwtHelper = new JwtHelperService();
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  public isLoggedIn$ = this.loggedIn.asObservable(); 

  constructor(private http: HttpClient) { }

  register(userName: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/register`, 
      { userName, email, password } as RegisterRequest
    ).pipe(
      tap(response => this.setSession(response))
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, 
      { email, password } as LoginRequest
    ).pipe(
      tap(response => {
        this.setSession(response);
        this.loggedIn.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.loggedIn.next(false);
  }

  refreshAccessToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/refresh-token`, 
      { refreshToken }
    ).pipe(
      tap(response => this.setSession(response))
    );
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    return this.jwtHelper.decodeToken(token);
  }

  getUserId(): string | null {
    const decoded = this.getDecodedToken();
    return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }

  getUsername(): string | null {
    const decoded = this.getDecodedToken();
    return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }

  getEmail(): string | null {
    const decoded = this.getDecodedToken();
    return decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
  }

  private setSession(response: AuthResponse) {
    localStorage.setItem('token', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }
}