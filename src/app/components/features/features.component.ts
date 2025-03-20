import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})

export class FeaturesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe(
      response => {
        this.categories = response;
        console.log(response);
      },
      error => {
        console.error('Error getting categories:', error);
      }
    );
  }
}