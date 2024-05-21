import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private searchSubject = new BehaviorSubject<string>('');
  searchObservable = this.searchSubject.asObservable();

  setSearchText(searchText: string) {
    this.searchSubject.next(searchText);
  }
}