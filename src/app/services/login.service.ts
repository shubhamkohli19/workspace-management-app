import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
import { Router } from '@angular/router';

const API_BASE_URL: string = "https://localhost:44307/api/Login";
// const API_BASE_URL: string = 'https://localhost:44374/api/Login';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private httpClient: HttpClient,
    private router: Router) { }

  login(login: Login): void {
    this.httpClient.post<any>(`${API_BASE_URL}/postUser`, login).subscribe
      (response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/homepage']);
        }
      }, error => {
        console.error('Error during login:', error);
      });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/homepage']);
  }
}