import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:7257/api/User/';
  constructor(
    private http: HttpClient
  ) { }

  signUp(userData: any) {
    return this.http.post<any>(`${this.baseUrl}register`, userData);
  }
  login(credentials: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, credentials);     
  }
}
