import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { signup } from './../models/signup';
import { Observable } from "rxjs";


// const API_BASE_URL: string = "https://localhost:44307/api/Signup";
const API_BASE_URL: string = "https://localhost:44374/api/Signup";

@Injectable({
    providedIn: 'root'
})

export class SignupService {
    constructor(private httpClient: HttpClient) { }

    public signupUser(user: signup): Observable<any> {
        return this.httpClient.post<any>(`${API_BASE_URL}/signupUser`, user);
    }
}