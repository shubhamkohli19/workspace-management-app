import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.css'] 
})
export class SelectServiceComponent {
  searchtext: string = '';
  categories: Category[] = [];
  total: number = 0;
  filteredCategories: Category[] = [];
  searchSubscription: Subscription = new Subscription;

  constructor(private categoryService: CategoryService, private router: Router, private searchService: SearchService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data.map(category => {
        category.highlightsArray = category.highlights.split(",").map(highlight => highlight.trim());
        return category;
      });
      this.filteredCategories = this.categories;
      this.total = data.length;
    });

    this.searchSubscription = this.searchService.searchObservable.subscribe(searchtext => {
      this.searchtext = searchtext;
      this.filterCategories();
    });
  }  

  filterCategories(): void {
    if (this.searchtext.trim()) {
      this.filteredCategories = this.categories.filter(category =>
        category.categoryName.toLowerCase().includes(this.searchtext.toLowerCase())
      );
    } else {
      this.filteredCategories = this.categories;
    }
  }

  SelectedService(str: string){
    this.router.navigate(['/select-location'],  { state: { 'select-service' : str } });
  }
}
