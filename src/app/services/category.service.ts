import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private apiUrl = 'https://iyofkr3uoj.execute-api.ap-south-1.amazonaws.com/Stage1/api/Categories/getServices';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}