import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '../../models/location';
import { LocationService } from '../../services/location.service';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrls: ['./select-location.component.css']
})

export class SelectLocationComponent implements OnInit, OnDestroy {
  searchtext: string = '';
  service: string = '';
  locations: Location[] = [];
  filteredLocation: Location[] = [];
  searchSubscription: Subscription = new Subscription();
  selectedPrices: string[] = [];
  selectedWorkspaces: string[] = [];
  total: number = 0;

  priceOptions = [
    { value: '100-300', label: '100-300' },
    { value: '300-500', label: '300-500' },
    { value: '500-700', label: '500-700' },
    { value: 'Above 700', label: 'Above 700' }
  ];

  workspaceOptions = [
    { value: '1-10', label: '1-10' },
    { value: '10-20', label: '10-20' },
    { value: '20-30', label: '20-30' },
    { value: '30-40', label: '30-40' }
  ];

  constructor(private locationService: LocationService, private route: ActivatedRoute, private router: Router, private searchService: SearchService) {
    this.route.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        this.service = navigation.extras.state['select-service'];
      }
    });

    this.applyFilters();
  }

  ngOnInit(): void {
    this.locationService.getLocations().subscribe((data: Location[]) => {
      this.locations = data;
      this.filteredLocation = this.locations;
      this.total = data.length;
    });

    this.searchSubscription = this.searchService.searchObservable.subscribe(searchtext => {
      this.searchtext = searchtext;
      this.filterLocations();
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  updateSelectedPrices(value: string, event: any) {
    const checked = event.target.checked;
    if (checked) {
      this.selectedPrices.push(value);
    } else {
      const index = this.selectedPrices.indexOf(value);
      if (index > -1) {
        this.selectedPrices.splice(index, 1);
      }
    }
    this.applyFilters();
  }

  updateSelectedWorkspaces(value: string, event: any) {
    const checked = event.target.checked;
    if (checked) {
      this.selectedWorkspaces.push(value);
    } else {
      const index = this.selectedWorkspaces.indexOf(value);
      if (index > -1) {
        this.selectedWorkspaces.splice(index, 1);
      }
    }
    this.applyFilters();
  }

  applyFilters() {
    this.filteredLocation = this.locations.filter(location => {
      const matchesPrice = this.selectedPrices.length === 0 || this.selectedPrices.some(priceRange => {
        if (priceRange === 'Above 700') {
          return location.price > 700;
        }
        const [minPrice, maxPrice] = priceRange.split('-').map(Number);
        return location.price >= minPrice && location.price <= maxPrice;
      });

      const matchesWorkspace = this.selectedWorkspaces.length === 0 || this.selectedWorkspaces.some(workspaceRange => {
        const [minWorkspace, maxWorkspace] = workspaceRange.split('-').map(Number);
        return location.workspaceNo >= minWorkspace && location.workspaceNo <= maxWorkspace;
      });

      return matchesPrice && matchesWorkspace;
    });
  }

  clearFilters() {
    this.selectedPrices = [];
    this.selectedWorkspaces = [];
    this.applyFilters();
  }

  filterLocations(): void {
    if (this.searchtext.trim()) {
      this.filteredLocation = this.locations.filter(location =>
        location.name.toLowerCase().includes(this.searchtext.toLowerCase())
      );
    } else {
      this.filteredLocation = this.locations;
    }
  }

  sortLocations(event: any) {
    const criteria = event?.target.value;
    if (criteria === 'priceAsc') {
      this.filteredLocation.sort((a, b) => a.price - b.price);
    } else if (criteria === 'priceDesc') {
      this.filteredLocation.sort((a, b) => b.price - a.price);
    } else if (criteria === 'alphabetical') {
      this.filteredLocation.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  SelectedService(str: string) {
    this.router.navigate(['/rent-workspace'], { state: { 'select-location': str, 'select-service': this.service } });
  }
}