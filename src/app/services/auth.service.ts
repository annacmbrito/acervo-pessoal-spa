import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly TOKEN_KEY: string = "AUTH_TOKEN";

  constructor(private http: HttpClient) { }

  public signIn(data: {
    email: string, 
    password: string
  }): Observable<void> {
    return this.http.post<{token:string}>(`${environment.apiBaseUrl}/api/v1/auth`, data)
      .pipe(map(({ token }) => localStorage.setItem(this.TOKEN_KEY, token)));
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  public signOut(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
