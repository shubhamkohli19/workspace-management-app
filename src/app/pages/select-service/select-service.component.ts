import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.css'] // Note the corrected property name
})
export class SelectServiceComponent {

  categories: Category[] = [];
  total: number = 0;

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data.map(category => {
        // Transform the highlights string into an array
        category.highlightsArray = category.highlights.split(",").map(highlight => highlight.trim());
        return category;
      });
      console.log(this.categories);
      this.total = data.length;
    });
  }

  SelectedService(str: string){
    this.router.navigate(['/select-location'],  { state: { 'select-service' : str } });
  }
}
