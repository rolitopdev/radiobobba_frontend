import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public radioName: string = "RadioBobba";
  private token: string | null = null;
  private expirationDate: number | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`http://localhost:8001/api/login`, credentials);
  }

  logout() {
    this.token = null;
    this.expirationDate = null;
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    this.token = localStorage.getItem('token');
    return this.token !== null && !this.isTokenExpired();
  }

  setTokenExpiration() {
    const decoded: any = jwtDecode(this.token!);
    this.expirationDate = decoded.exp * 1000; // Convertir a milisegundos
    localStorage.setItem('tokenExpiration', this.expirationDate.toString());
  }

  private isTokenExpired(): boolean {
    if (!this.token) return true;

    const storedExpiration = localStorage.getItem('tokenExpiration');
    if (storedExpiration) {
      const expirationTime = parseInt(storedExpiration, 10);
      return Date.now() > expirationTime; // Retorna true si el token ha expirado
    }
    return true; // Si no hay tiempo de expiración, consideramos que ha expirado
  }

}