import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = 'https://localhost:7257/api/User/';
  constructor(
    private http: HttpClient
  ) { }

  getAllUsers() {
    return this.http.get<any>(this.baseUrl);
  }

  
}
