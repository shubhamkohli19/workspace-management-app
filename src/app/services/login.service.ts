import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const API_BASE_URL: string = "https://localhost:44307/api/Login";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private httpClient: HttpClient,
    private router: Router) { }

  login(login: Login): Observable<string> {
    return new Observable<string>((observer) => {
      this.httpClient.post<any>(`${API_BASE_URL}/postUser`, login).subscribe(
        (response: any) => {
          if (response && response.token) {
            console.log(response);
            localStorage.setItem('token', response.token);
            localStorage.setItem('email', response.email);
            localStorage.setItem('name',  response.firstName);
            this.router.navigate(['/homepage']);
          }
          observer.complete();
        },
        (error: any) => {
          if (error.status == 409) {
            observer.next(error.error);
          } else {
            observer.error('An error occurred. Please try again.');
          }
          observer.complete();
        }
      );
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/homepage']);
  }
}