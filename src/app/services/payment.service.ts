import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  private apiUrl = 'https://localhost:44307/api/Payment';
  // private apiUrl = 'https://localhost:44374/api/Payment';

  constructor(private http: HttpClient) { }

  createCheckoutSession(obj: any): Observable<any> {
    return this.http.post<Observable<any>>(`${this.apiUrl}/create-checkout-session`, obj);
  }
}