import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_BASE_URL = 'https://localhost:44307/api/Sites';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  constructor(private http: HttpClient) {}

  uploadSite(siteData: FormData): Observable<any> {
    return this.http.post(`${API_BASE_URL}/upload`, siteData);
  }
}
