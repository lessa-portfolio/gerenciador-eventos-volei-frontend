import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { environment } from '../../../environments/environments';
import { ITokenJwt } from '../interfaces/ITokenJwt';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}

  public login(username: string, senha: string): Observable<ITokenJwt> {
    return this.http
      .post<ITokenJwt>(`${environment.apiUrl}/auth/login`, {
        username,
        senha,
      })
      .pipe(tap((response) => this.salvarToken(response.token)));
  }

  public cadastrar(email: string, username: string, senha: string): Observable<ITokenJwt> {
    return this.http
      .post<ITokenJwt>(`${environment.apiUrl}/auth/register`, {
        email,
        username,
        senha,
      })
      .pipe(tap((response) => this.salvarToken(response.token)));
  }

  public logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public salvarToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public jwtValido(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  public getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } catch {
      return null;
    }
  }
}
