// rental-form.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentalForm } from '../models/rentalForm';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private apiUrl = 'your_api_url';

  constructor(private http: HttpClient) { }

  submitRentalForm(formData: RentalForm): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/rentalForm`, formData);
  }
}
