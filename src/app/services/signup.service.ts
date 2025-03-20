import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { signup } from './../models/signup';
import { Observable } from "rxjs";
import { Router } from "@angular/router";

const API_BASE_URL: string = "https://localhost:44307/api/Signup";

@Injectable({
    providedIn: 'root'
})
export class SignupService {
    constructor(private httpClient: HttpClient, private router: Router) { }

    public signupUser(user: signup): Observable<any> {
        return new Observable<string>((observer) => {
              this.httpClient.post<any>(`${API_BASE_URL}/signupUser`, user).subscribe(
                (response: any) => {
                  if (response && response.token) {
                    localStorage.setItem('token', response.token);
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
}
