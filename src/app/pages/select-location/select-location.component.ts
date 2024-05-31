import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location';

@Component({
  selector: 'app-select-location',
  templateUrl: './select-location.component.html',
  styleUrl: './select-location.component.css'
})

export class SelectLocationComponent implements OnInit{
  service : string = '';
  locations: Location[] = [];
  filteredLocation: Location[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private locationService: LocationService){
    this.route.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation && navigation.extras.state) {
        this.service = navigation.extras.state['select-service'];
      }
    })
  }

  ngOnInit(): void {
    this.locationService.getLocations().subscribe((data: Location[]) => {
      this.locations = data.map(location => {
        console.log(location);
        return location;
      });
      this.filteredLocation = this.locations;
    });
  } 

  SelectedService(str: string){
    this.router.navigate(['/rent-workspace'],  { state: { 'select-location': str, 'select-service': this.service } });
  }
}