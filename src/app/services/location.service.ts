import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from './../models/location';

@Injectable({
  providedIn: 'root'
})

export class LocationService {
  private apiUrl = 'https://localhost:7285/api/Locations/getLocations';

  constructor(private http: HttpClient) { }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }
}