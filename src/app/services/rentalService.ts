import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalForm } from '../models/rentalForm';
import { HttpClient } from '@angular/common/http';

const API_BASE_URL: string = "https://localhost:44307/api/RentDetail";
// const API_BASE_URL: string = "https://localhost:44374/api/RentDetail";

@Injectable({
  providedIn: 'root'
})

export class RentalService {
  constructor(private http: HttpClient) { }

  submitRentalForm(formData: RentalForm): Observable<any> {
    return this.http.post<any>(`${API_BASE_URL}/addRentDetail`, formData);
  }
}