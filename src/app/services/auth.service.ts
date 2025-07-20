import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'https://localhost:7257/api/User/';
  private userPayload: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userPayload = this.decodeToken();
  }

  signUp(userData: any) {
    debugger
    return this.http.post<any>(`${this.baseUrl}register`, userData);
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, credentials);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token; // Returns true if token exists, false otherwise
  }

  sigmOut() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['login']);
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;

    return jwtHelper.decodeToken(token);
  }

  getfullNameFromToken() {
    if (this.userPayload)
      return this.userPayload.name;
  }

  gerRoleFromToken() {
    if (this.userPayload)
      return this.userPayload.role;
  }
}
