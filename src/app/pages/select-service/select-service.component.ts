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
  selectedRatings: number[] = [];
  selectedAssets: string[] = [];

  ratingOptions = [
    { value: 5, label: '5 ⭐' },
    { value: 4, label: '4 ⭐ & above' },
    { value: 3, label: '3 ⭐ & above' },
    { value: 0, label: 'Others' },
  ];

  assetOptions = [
    { value: 'Workbenches', label: 'Workbenches' },
    { value: 'Camera', label: 'Camera' },
    { value: 'Lighting', label: 'Lighting' },
    { value: 'Wifi', label: 'Wifi' },
  ];

  constructor(private categoryService: CategoryService, private router: Router, private searchService: SearchService) {
    this.applyFilters();
  }

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

  isRatingSelected(value: number): boolean {
    return this.selectedRatings.includes(value);
  }

  updateSelectedRatings(value: number, event: any) {
    const checked = event.target.checked;
    if (checked) {
      if (value === 0) {
        this.selectedRatings.push(0);
      } else {
        for (let i = value; i <= 5; i++) {
          if (!this.selectedRatings.includes(i)) {
            this.selectedRatings.push(i);
          }
        }
      }
    } else {
      if (value === 0) {
        this.selectedRatings = this.selectedRatings.filter(rating => rating !== 0);
      } else {
        this.selectedRatings = this.selectedRatings.filter(rating => rating < value);
      }
    }
    this.applyFilters();
  }

  updateSelectedAssets(value: string, event: any) {
    const checked = event.target.checked;
    if (checked) {
      this.selectedAssets.push(value);
    } else {
      const index = this.selectedAssets.indexOf(value);
      if (index > -1) {
        this.selectedAssets.splice(index, 1);
      }
    }
    this.applyFilters();
  }

  applyFilters() {
    this.filteredCategories = this.categories.filter(category => {
      const matchesRating = this.selectedRatings.length === 0 || this.selectedRatings.some(rating => {
        if (rating === 0) {
          return category.rating < 3;
        } else {
          return category.rating >= rating;
        }
      });

      const matchesAsset = this.selectedAssets.length === 0 ||
        this.selectedAssets.some(asset => category.highlights.includes(asset));

      return matchesRating && matchesAsset;
    });
  }

  clearFilters() {
    this.selectedRatings = [];
    this.selectedAssets = [];
    this.applyFilters();
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

  sortServices(event: any) {
    const criteria = event?.target.value;
    if (criteria === 'ratingAsc') {
      this.filteredCategories.sort((a, b) => a.rating - b.rating);
    } else if (criteria === 'ratingDesc') {
      this.filteredCategories.sort((a, b) => b.rating - a.rating);
    } else if (criteria === 'alphabetical') {
      this.filteredCategories.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
    }
  }

  SelectedService(str: string) {
    this.router.navigate(['/select-location'], { state: { 'select-service': str } });
  }
}